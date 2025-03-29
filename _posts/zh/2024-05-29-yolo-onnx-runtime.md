---
title: "YOLOv8的ONNX Runtime部署(C++)"
categories:
  - blogs
tags:
  - C++
  - YOLO
  - ONNX Runtime
lang: zh

header: 
  teaser: "./assets/images/YOLO-ONNX-CPLUS/image-20240529185236577.png"
---


某Ubuntu桌面应用项目中需要使用到视觉目标检测模块，该桌面应用基于QT5使用C++实现，综合考虑性能以及后续的打包分发部署，选择使用 ONNX Runtime进行深度学习模型的部署。

YOLO系列是极为知名的目标检测模型，我曾经在某无人机项目中使用过v5版本，截止当前（2024.5.29）已经推出到v10版本。此次选择较为成熟的v8版本进行部署。



# ONNX Runtime推理

**ONNX**（Open Neural Network Exchange）是一种针对机器学习所设计的开放式的文件格式，用于存储训练好的模型。它使得不同的人工智能框架（如Pytorch、MXNet）可以采用相同格式存储模型数据并交互。 *（引自[wiki](https://zh.wikipedia.org/wiki/ONNX)）*

简明来讲就是onnx格式基本支持与各种格式（PyTorch, MXNet等）的模型相互转化，用来部署很方便。关于ONNX Runtime的简明教程有很多，这里简单罗列下：

- [ONNX Runtime官方文档](https://onnxruntime.ai/docs/)，官方很全，但身为小白对我来说信息过载了，感觉可以当字典。
- [部署实例1](https://blog.csdn.net/qq_42995327/article/details/122622222)，[部署实例2](https://blog.csdn.net/u013250861/article/details/127911920)，抱歉中文互联网确实没找到太多，但CSDN有些时候还是有些值得一看的技术记录文档，实例2我一开始看了就有些启发。
- [netron](https://netron.app/)，查看onnx网络很好用，好工具必须放上去。

## 安装

那么接下来就由我的代码再顺一遍使用流程：

## 引用链接库文件

因为当时执行安装命令了，所以这里直接简单粗暴：

```cmake
include_directories(usr/local/include/onnxruntime)
target_link_libraries(DeskPet 
    ${PROJECT_NAME}
    Qt5::Widgets
    Qt5::Gui
    ${OpenCV_LIBS}
    /usr/local/lib/libonnxruntime.so
    )
```

这里只罗列了与之直接相关的两行，DeskPet是我的可执行文件，这里的连接也可以考虑使用部署实例2](https://blog.csdn.net/u013250861/article/details/127911920)中的做法，当然因为还有后续打包的操作，这里怎么处理仍需斟酌。

使用的文件中直接引用：

```c++
#include<onnxruntime/core/session/onnxruntime_cxx_api.h>
```

这个头文件包含了使用 ONNX Runtime 在 C++ 中进行模型推理所需的所有必要声明和定义，如核心的env、session、Value等，这里后面会讲。当然如果想配置一些cuda的高级选项，可以引用`cuda_provider_factory.h`，我的知识栈还未到如此程度，这里不再深入了解。

## 初始化与模型读取

因为是功能模块，所以这里封装了一个类`eyeAnalyzer`，因为YOLOv5为单输入单输出节点，这里只截取ONNX Runtime单个模型单输入单输出初始化相关的部分，节点多输入多输出可通过`session`加载。

```c++
class eyeAnalyzer{
public:
    eyeAnalyzer(const std::string& detect_model_path, const int mode = 1);
    ~eyeAnalyzer();
    // 其他声明

private:
    Ort::Env env;
    Ort::SessionOptions session_options;
    Ort::MemoryInfo memory_info;

    Ort::Session detect_session;

    std::vector<const char*> detect_input_node_names;
    std::vector<const char*> detect_output_node_names;
    // 其它声明
};
```



```c++
eyeAnalyzer::eyeAnalyzer(const std::string& detect_model_path, const int mode)
    : env(ORT_LOGGING_LEVEL_WARNING, "SmartDesktopPet"), session_options(), 			 memory_info(Ort::MemoryInfo::CreateCpu(OrtDeviceAllocator, OrtMemTypeCPU)), detect_session(env, detect_model_path.c_str(), session_options)
{   
    // Enable CUDA (GPU) support
    Ort::ThrowOnError(OrtSessionOptionsAppendExecutionProvider_CUDA(session_options, 0));
    detect_input_node_names = {"images"};
    detect_output_node_names = {"output0"};
    // 其它初始化内容
}
```

### 配置 `env`

```c++
env(ORT_LOGGING_LEVEL_WARNING, "SmartDesktopPet")
```

`Ort::Env` 是 ONNX Runtime 中的一个类，用于初始化和管理整个 ONNX Runtime 的环境和全局状态，包括日志记录、线程池等。初始化 `env` 对象是必不可少的，它确保 ONNX Runtime 的各项功能能够正确工作。后续通过**依赖注入**传递给sesion。

### 配置 `session_options`

```c++
session_options()
detect_session(env, detect_model_path.c_str(), session_options)
```

`Ort::SessionOptions`用于设置各种选项，最常用的似乎是图优化加速、配置CUDA、设置动态输入输出等。

`Ort::Session`承载模型，调用run方法即可由输入得到输出。

### 配置内存分配信息

```c++
memory_info(Ort::MemoryInfo::CreateCpu(OrtDeviceAllocator, OrtMemTypeCPU))
```

创建一个 `Ort::MemoryInfo` 对象，用于描述内存分配器和内存类型的信息。这个信息在 ONNX Runtime 中用于管理内存的分配和使用。

### 初始化输入输出节点名字

这里只需要用Netron查看网络即可，当然也有动态获取的方法，见官方文档。

### 其它设置

```c++
Ort::ThrowOnError(OrtSessionOptionsAppendExecutionProvider_CUDA(session_options, 0));
```

设置CUDA支持，以GPU-0加速推理



## 模型推理

```c++
std::vector<cv::Rect> eyeAnalyzer::detect(const cv::Mat& image) {
    // Resize and preprocess the image
    cv::Mat image_resized, rgb_image;
    cv::resize(image, image_resized, cv::Size(640, 640));
    image_resized.convertTo(rgb_image, CV_32F, 1.0 / 255);
    // Create input tensor
    std::array<int64_t, 4> input_shape = {1, 3, 640, 640};
    size_t input_tensor_size = 1 * 3 * 640 * 640;

    std::size_t counter = 0;
    std::vector<float> input_tensor_values(input_tensor_size);
    for (int c = 0; c < rgb_image.channels(); ++c) {
        for (int h = 0; h < rgb_image.rows; ++h) {
            for (int w = 0; w < rgb_image.cols; ++w) {
                input_tensor_values[counter] = rgb_image.at<cv::Vec3f>(h, w)[c];
                counter++;
            }
        }
    }
    
    Ort::Value input_tensor = Ort::Value::CreateTensor<float>(memory_info, input_tensor_values.data(), input_tensor_size, input_shape.data(), input_shape.size());

    // Run the model
    auto output_tensors = detect_session.Run(Ort::RunOptions{ nullptr }, detect_input_node_names.data(), &input_tensor, 1, detect_output_node_names.data(), 1);

    // Process the output
    float* output_data = output_tensors.front().GetTensorMutableData<float>();
    // 其它代码
}
```

### 首先需要得到输入张量

关于onnxruntime需要注意的是，传入的指针对应的数据类型与创建张量(Tensor)时类型要对应，同时使用连续的空间分配

```c++
    Ort::Value input_tensor = Ort::Value::CreateTensor<float>(memory_info, input_tensor_values.data(), input_tensor_size, input_shape.data(), input_shape.size());
```

### 运行模型

没什么特别要讲的，注意输入类型按提示输入即可。

### 输出预处理

```c++
float* output_data = output_tensors.front().GetTensorMutableData<float>();
```

# YOLOv8推理

*[Ultralytics](https://ultralytics.com/) [YOLOv8](https://github.com/ultralytics/ultralytics) is a cutting-edge, state-of-the-art (SOTA) model that builds upon the success of previous YOLO versions and introduces new features and improvements to further boost performance and flexibility. YOLOv8 is designed to be fast, accurate, and easy to use, making it an excellent choice for a wide range of object detection and tracking, instance segmentation, image classification and pose estimation tasks.*

YOLOv8 github网站上是这样介绍自己的，一个字就是：牛x

由于目前本人对深度学习网络的了解较为浅薄，只有基础的网络结构（CNN、RNN、LSTM等）、基础的算子（Relu、sigmoid等），本次项目主要面向部署，故不再花费大量精力了解其创新点并通透该网络结构，只针对自己需要的，用到的做简单说明，具体解析如果后续有机会会去拜读官方文档。

这里有篇[解析文章](https://zhuanlan.zhihu.com/p/598566644)。

## 获得预训练模型

那么使用官方提供的预训练模型，我需要了解的即其输入与输出。首先官方已经提供了模型转化的API。

```python
from ultralytics import YOLO
# Load a model
model = YOLO("models/Detect/yolov8s.pt")  # load an official model
# Export the model
model.export(format="onnx")
```

那么在Netron中查看其网络结构：

{% include image.html url="/assets/images/YOLO-ONNX-CPLUS/image-20240529170537250.png" description="Network" %}

得到我最需要关注的信息，输入节点名字为images，输入为分辨率3×640×640图像；输出节点名字为output0，输出为1×84×8400的数据。

## 归一化输入张量

```c++
image_resized.convertTo(rgb_image, CV_32F, 1.0 / 255);
```

输出的信息在官方文档查找，为8400个检测框的中心点、长宽数据与80个训练类别在8400个检测框下置信度。好的，洞悉了这些对于这次部署就足够了。

## 提取与可视化

```c++
std::vector<cv::Rect> eyeAnalyzer::detect(const cv::Mat& image) {
	// 其它内容
    // 输出是 [1, 84, 8400]需要向转化（x, y, w, h, conf, class）
    size_t num_detections = 8400;

    for (size_t i = 0; i < num_detections; i++) {
        float conf = 0;
        int class_id = -1;
        for(int j = 4; j < 84; j++){
            if(conf <= output_data[j * num_detections + i]){
                conf = output_data[j * num_detections + i];
                class_id = static_cast<int>(j-4);
            }
        }
        if(conf < 0.4){
            continue;
        }
        float x = output_data[0 * num_detections + i];
        float y = output_data[1 * num_detections + i];
        float w = output_data[2 * num_detections + i];
        float h = output_data[3 * num_detections + i];         
        int left = static_cast<int>(x - w / 2);
        int top = static_cast<int>(y - h / 2);
        int width = static_cast<int>(w);
        int height = static_cast<int>(h);
        
        results[class_id].push_back({ {left, top, width, height}, conf, class_id});
    }
    for (const auto& rect : vimg) {
        cv::rectangle(image_resized, rect, cv::Scalar(0, 255, 0), 2);
    }
    
    // 显示结果
    cv::imshow("Detections", image_resized);
    cv::waitKey(0);
  
    // 其它内容
}
```

## 识别结果：

{% include image.html url="/assets/images/YOLO-ONNX-CPLUS/image-20240529172939911.png" description="无 NMS 的识别结果" %}

推理成功，但是问题为多检测框重复，接下来加入NMS模块抑制该问题。

# NMS模块

非极大值抑制(Non-Maximum Suppression, NMS)是视觉处理中极为常见的算法，思想为搜素局部最大值，抑制非极大值。这部分其实opencv在3.3版本后已经封装好了函数，可以直接调用。但是不巧，本机上的为3.2，作为基础且常见的算法直接手写：

## 使用交并比(Intersection over Union，IoU)作为衡量标准

```c++
float eyeAnalyzer::IoU(const std::vector<int>& box1, const std::vector<int>& box2){
    int x1 = std::max(box1[0], box2[0]);
    int y1 = std::max(box1[1], box2[1]);
    int x2 = std::min(box1[0] + box1[2], box2[0] + box2[2]);
    int y2 = std::min(box1[1] + box1[3], box2[1] + box2[3]);

    float intersection_area = std::max(0, x2 - x1) * std::max(0, y2 - y1);
    int box1_area = box1[2] * box1[3];
    int box2_area = box2[2] * box2[3];

    float iou = intersection_area/(box1_area + box2_area - intersection_area);

    return iou;
}
```

## 按置信度排序

```c++
    for (auto& kv : results) {
        std::sort(kv.second.begin(), kv.second.end(), compareDetections);
    }
    
    // NMS
    for (auto& kv : results) {
        kv.second = nonMaximumSuppression(kv.second, 0.6);
    }
```

这部分按类进行两层遍历，从置信度最大的第一个检测框开始，检测到后续检测框IoU大于设定阈值则删除检测框，否则保留，直至遍历完成。

## 时间复杂度分析

对于一个类别，算上排序算法，复杂度最好为$O(nlog(n))$，最差为$O(n<sup>2</sup>)$

```c++
std::vector<Detection> eyeAnalyzer::nonMaximumSuppression(const std::vector<Detection>& detections, float iou_threshold)
{
    std::vector<Detection> keepResults;
    std::vector<Detection> sorted_detections = detections;

    while (!sorted_detections.empty()) {
        Detection best_detection = sorted_detections.front();
        keepResults.push_back(best_detection);
        sorted_detections.erase(sorted_detections.begin());

        auto it = sorted_detections.begin();
        while (it != sorted_detections.end()) {
            if (IoU(best_detection.bbox, it->bbox) > iou_threshold) {
                it = sorted_detections.erase(it);
            } 
            else {
                ++it;
            }
        }
    }
    
    return keepResults;
}
```

# 测试

{% include image.html url="/assets/images/YOLO-ONNX-CPLUS/image-20240529173447457.png" description="使用 NMS 的结果" %}

测试设定的置信度为大于0.2，可以看到效果编号。基本部署完成~

后续就是调参，如果有余力美化下检测框。

{% include image.html url="/assets/images/YOLO-ONNX-CPLUS/image-20240529185236577.png" description="Result beauty" %}

