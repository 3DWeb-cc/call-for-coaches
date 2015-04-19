$(window).resize(function (e) {
    var h = $(document).height(), w = $(document).width();
    $('#myForm').width(w / 2).css('left', w / 4);
});

var theMaterial, theLight, theLight2;

function onStart() {
    'use strict';

    var
        theContainer, renderer, theScene, theCamera, theGeometry,
        theColor = 0xFC6A45,
        positive = true,
        cubeSize = 1,
        elem,
        cubes = [],
        cubeNumber = 20,
        h = $(document).height(), w = $(document).width();

    theContainer = $("#animation");
    renderer = new THREE.WebGLRenderer({alpha: true});
    console.log(w, h);
    renderer.setSize(w, h);
    theScene = new THREE.Scene();
    theCamera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
    theCamera.position.set(0, 0, 10);
    theContainer.replaceWith(renderer.domElement);

    theGeometry = new THREE.BoxGeometry(2, 2, 2);
    theMaterial = new THREE.MeshLambertMaterial({
        color: theColor
    });

    for (var i = 0; i < cubeNumber; i += 1) {
        for (var k = 0; k < cubeNumber; k += 1) {
            elem = new THREE.Mesh(theGeometry, theMaterial);
            cubes.push(elem);
            elem.position.set(-cubeNumber + (cubeSize * 2 * k), -cubeNumber + (cubeSize * 2 * i), 0); //(k + i) % 2 === 0 ? cubeSize : -cubeSize);

            theScene.add(elem);
        }
    }

    theLight = new THREE.DirectionalLight(0xffffff, 1);
    theLight.position.set(20, 20, 20);
    theScene.add(theLight);

    theLight2 = new THREE.DirectionalLight(0xffffff, 0.6);
    theLight2.position.set(-20, -20, 20);
    theScene.add(theLight2);

    requestAnimationFrame(animate);

    setInterval(function () {
        positive = !positive;
    }, 3000);

    $(window).resize();

    function animate() {
        renderer.render(theScene, theCamera);

        $(cubes).map(function (index, cube) {
            cube.rotation.y += 0.01;
            cube.rotation.x += 0.01;

            if (positive) {
                cube.position.y += 0.01;
                cube.position.x += 0.01;
            } else {
                cube.position.y -= 0.01;
                cube.position.x -= 0.01;
            }

        });

        requestAnimationFrame(animate);
    }
}
