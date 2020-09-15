document.addEventListener('DOMContentLoaded', function() {
    const navs = document.querySelectorAll('.sidenav');
    const navInstances = M.Sidenav.init(navs);

    const elems = document.querySelectorAll('.dropdown-trigger');
    const dropInstances = M.Dropdown.init(elems, {
        alignment: 'right',
        hover: true,
        inDuration: 350,
        outDuration: 350,
    });
});