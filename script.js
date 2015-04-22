var theMaterial, theLight, theLight2, cubeNumber = 14, elem, cubes = [], cubeSize = 1;


function onStart() {
  'use strict';

  var
    theContainer, theRenderer, theScene, theCamera, theGeometry,
    theColor = 0x60A1E1, //60A1E1, //0x3B5CA9,
    transition = 0.002,
    body = $('body'), h = body.height(), w = body.width();
  //h = $(document).height(), w = $(document).width();

  theContainer = $("#animation");
  theRenderer = new THREE.WebGLRenderer({alpha: true});
  console.log(w, h);
  theRenderer.setSize(w, h);
  theScene = new THREE.Scene();
  theCamera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
  theCamera.position.set(0, 0, 10);
  theContainer.replaceWith(theRenderer.domElement);

  theGeometry = new THREE.BoxGeometry(2, 2, 2);
  theMaterial = new THREE.MeshLambertMaterial({
    color: theColor
  });

  $(window).resize(function (e) {
    var
      h = body.height(),
      w = body.width();

    theRenderer.setSize(w,h);
    theCamera.aspect = w / h;
    theCamera.updateProjectionMatrix();

    //$('#myForm').width(w / k).css('left', w / 2 - (w / k / 2));
  });

  function reSizeScene() {
    for (var i = 0; i < cubeNumber; i += 1) {
      for (var k = 0; k < cubeNumber; k += 1) {
        elem = cubes[(10 * i) + k];
        elem.position.set(-cubeNumber + (cubeSize * 2 * k), -cubeNumber + (cubeSize * 2 * i), 0);
      }
    }
  }

  $(window).resize();
  $('iframe').fadeIn();

  for (var i = 0; i < cubeNumber; i += 1) {
    for (var k = 0; k < cubeNumber; k += 1) {
      elem = new THREE.Mesh(theGeometry, theMaterial);
      cubes.push(elem);
      elem.position.set(-cubeNumber + (cubeSize * 2 * k), -cubeNumber + (cubeSize * 2 * i), 0);
      theScene.add(elem);
    }
  }

  theLight = new THREE.DirectionalLight(0xD2D2D2, 1);
  theLight.position.set(20, 20, 20);
  theScene.add(theLight);

  theLight2 = new THREE.DirectionalLight(0x193549 /*3B5CA9*/, 1.2);
  theLight2.position.set(-20, -20, 20);
  theScene.add(theLight2);

  requestAnimationFrame(animate);

  setInterval(function () {
    transition = -transition;
  }, 3000);

  function animate() {
    theRenderer.render(theScene, theCamera);

    $(cubes).map(function (index, cube) {
      cube.rotation.y += 0.006;
      cube.rotation.x += 0.006;
      cube.position.x += transition;
      cube.position.x += transition;
    });

    requestAnimationFrame(animate);
  }
}
