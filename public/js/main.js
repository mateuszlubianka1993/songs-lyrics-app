document.addEventListener('DOMContentLoaded', function() {
    let elems = document.querySelectorAll('.sidenav');
    let instances = M.Sidenav.init(elems);

    CKEDITOR.replace('lyrics', {
        plugins: 'wysiwygarea, toolbar, basicstyles'
    })
});