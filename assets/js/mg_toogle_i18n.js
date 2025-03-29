$(document).ready(function() {
    // 初始化时根据当前路径设置按钮状态和 <html> 的 lang 属性
    if (window.location.pathname.startsWith('/zh/')) {
      $('.mh_toogle').prop('checked', true);
      $('html').attr('lang', 'zh');
    } else {
      $('.mh_toogle').prop('checked', false);
      $('html').attr('lang', 'en');
    }

    $('.mh_toogle').on('change', function() {
      const currentPath = window.location.pathname;
      let newPath;

      if (currentPath.startsWith('/zh/')) {
        newPath = currentPath.replace('/zh/', '/');
      } else {
        newPath = `/zh${currentPath}`;
      }

      // 根据新路径更新 <html> 的 lang 属性
      if (newPath.startsWith('/zh/')) {
        $('html').attr('lang', 'zh');
      } else {
        $('html').attr('lang', 'en');
      }

      window.location.pathname = newPath;
    });

    // Set initial state based on current path
    if (window.location.pathname.startsWith('/zh/')) {
      $('.mh_toogle').prop('checked', true);
    }
  });