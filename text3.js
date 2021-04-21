
const config = {};

const container = document.body;
let clock = new THREE.Clock();
let camera, renderer, scene, raycaster, mesh1;
let mouse = new THREE.Vector2();
config.particleNum = 900;
var object, circle, skelet, particle, mesh2;

init();
animate();

function init() {
  let viewport = {
    width: container.clientWidth,
    height: container.clientHeight,
    aspectRatio: container.clientWidth / container.clientHeight,
  };

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);

  const FOV = 50;
  const CAMERA_NEAR = 0.1;
  const CAMERA_FAR = 160;
  const ASPECT_RATIO = viewport.aspectRatio;

  camera = new THREE.PerspectiveCamera(
    FOV,
    ASPECT_RATIO,
    CAMERA_NEAR,
    CAMERA_FAR
  );

  camera.position.set(0, 0, 25);

  {
    const near = 1;
    const far = 150;
    const color = 0xffffff;
    scene.fog = new THREE.Fog(color, near, far);
  }

  const sectionsInfo = [
    {
      images: [
        "https://uploads-ssl.webflow.com/60489670445267e3dd7d3add/60786401fc40848ea38ac1e6_text1_black.png",
        "https://uploads-ssl.webflow.com/60489670445267e3dd7d3add/607e6b3b8dfb1a42d7289a24_zitat2.png",
        "https://uploads-ssl.webflow.com/60489670445267e3dd7d3add/6048cc0281e2da79968a323d_1.jpg",
        "https://uploads-ssl.webflow.com/60489670445267e3dd7d3add/6048cc0286faad4edf066266_3.jpg",
        "https://uploads-ssl.webflow.com/60489670445267e3dd7d3add/604e932c314d3524e9eca07a_DS7_4469.jpg",
      ],

      title: "zitate",
    },

    {
      images: [
        "https://uploads-ssl.webflow.com/60489670445267e3dd7d3add/607e6b3c3fe350386ec28891_Texte1.png",
        "https://uploads-ssl.webflow.com/60489670445267e3dd7d3add/607e6b3ba1855c2b04f4543d_texte2.png",
        "https://uploads-ssl.webflow.com/60489670445267e3dd7d3add/607e6b3c45b70f122f6cac9d_texte3.png",
        "https://uploads-ssl.webflow.com/60489670445267e3dd7d3add/604e932cc4d62247a20d35fc_DS7_4470.jpg",
        "https://uploads-ssl.webflow.com/60489670445267e3dd7d3add/607e6b3c3409bd542849c508_texte4.png",
      ],

      title: "texte",
    },
  ];

  raycaster = new THREE.Raycaster();
  let intersections = [];
  const textureLoader = new THREE.TextureLoader();
  const fontLoader = new THREE.FontLoader();

  const font =
    "https://raw.githubusercontent.com/chris-ain/fonts/main/moret.json";
  const makePlane = (width, height, image) => {
    const geometry = new THREE.PlaneBufferGeometry(width, height, 1);
    const material = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      map: image,
      transparent: true,
    });
    const mesh = new THREE.Mesh(geometry, material);

    return mesh;
  };

  var ambientLight = new THREE.AmbientLight(0x353535, 2);
  scene.add(ambientLight);

  var directionalLight = new THREE.DirectionalLight(0xffffff, 5);
  directionalLight.position.set(1, 1, 1).normalize();
  scene.add(directionalLight);

  object = new THREE.Object3D();
  circle = new THREE.Object3D();
  skelet = new THREE.Object3D();
  particle = new THREE.Object3D();

  scene.add(object);
  scene.add(circle);
  scene.add(skelet);
  scene.add(particle);

  var geometry2 = new THREE.IcosahedronGeometry(2, 2);
  var geometry7 = new THREE.TetrahedronGeometry(2, 2);

  var material7 = new THREE.MeshPhysicalMaterial({
    color: 0x919191,
    shading: THREE.FlatShading,
    reflectivity: 56,
    roughness: 0.4,
    metalness: 1,
    fog: true,
  });

  for (var i = 0; i < 50; i++) {
    mesh1 = new THREE.Mesh(geometry2, material7);
    mesh1.position
      .set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5)
      .normalize();
    mesh1.position.multiplyScalar(200 + Math.random() * 400);
    mesh1.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
    mesh1.scale.x = mesh1.scale.y = mesh1.scale.z = Math.random() * 0.5;
    mesh1.scale.x = mesh1.scale.y = mesh1.scale.z = 2;
    object.add(mesh1);
  }

  for (var i = 0; i < 900; i++) {
    var mesh2 = new THREE.Mesh(geometry7, material7);
    mesh2.position
      .set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5)
      .normalize();
    mesh2.position.multiplyScalar(90 + Math.random() * 700);
    // mesh2.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
    mesh2.scale.x = mesh2.scale.y = mesh2.scale.z = Math.random() * 0.9;
    particle.add(mesh2);
  }

  const setImagesPositions = (image, index) => {
    if (index === 0) {
      // Top left
      gsap.set(image, { x: -28, y: 10, z: "-=30" });
    } else if (index === 1) {
      // Bottom left
      gsap.set(image, { x: -20, y: -10, z: "-=80" });
    } else if (index === 2) {
      // Top right
      gsap.set(image, { x: 20, y: 10, z: "-=40" });
    } else if (index === 3) {
      // Bottom right
      gsap.set(image, { x: 15, y: 0, z: "-=120" });
    } else if (index === 4) {
      // Bottom right
      gsap.set(image, { x: -10, y: 0, z: "-=180" });
    } else if (index === 5) {
      // Bottom right
      gsap.set(image, { x: -10, y: 0, z: "-=250" });
    }

    return;
  };

  const months = [];
  const MATCAP_URL = "https://assets.codepen.io/90647/3.png";

  const matcapTexture = textureLoader.load(MATCAP_URL);

  sectionsInfo.forEach((section, index) => {
    const sectionGroup = new THREE.Group();

    fontLoader.load(font, (font) => {
      const geometry = new THREE.TextGeometry(section.title, {
        font: font,
        size: 6,
        height: 0,
        curveSegments: 20,
        bevelEnabled: true,
        bevelThickness: 0.5,
        bevelSize: 0.1,
        bevelOffset: 0,
        bevelSegments: 20,
      });

      const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.geometry.center();
      sectionGroup.add(mesh);
    });

    section.images.forEach((image, index) => {
      const plane = makePlane(
        20,
        20,
        textureLoader.load(image, (texture) => {
          plane.scale.set(1.0, texture.image.height / texture.image.width, 1.0);
        })
      );
      intersections.push(plane);
      setImagesPositions(plane.position, index);

      sectionGroup.add(plane);
      months.push(sectionGroup);
    });

    gsap.set(sectionGroup.position, {
      z: () => -index * 150,
    });
    scene.add(sectionGroup);
  });

  let mousePerspective = {
    x: 0,
    y: 0,
  };

  const onMouseMove = (event) => {
    mouse.set(
      (event.clientX / window.innerWidth) * 2 - 1,
      (event.clientX / window.innerWidth) * -2 + 1
    );

    raycaster.intersectObjects(intersections).forEach((intersection) => {});

    mousePerspective.x = event.clientX / window.innerWidth - 0.5;
    mousePerspective.y = event.clientY / window.innerHeight - 0.5;

    gsap.to(camera.rotation, 4, {
      x: -mousePerspective.y * 0.5,
      y: -mousePerspective.x * 0.5,
      ease: "power4.out",
    });
  };

  window.addEventListener("mousemove", onMouseMove, false);

  document.addEventListener("mousewheel", (event) => {
    camera.position.z -= (event.deltaY / 10) * 0.25;
  });

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);
  renderer.autoClear = false;

  onWindowResize();

  window.addEventListener("resize", onWindowResize, false);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  // composer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
  requestAnimationFrame(animate);

  object.rotation.x += 0.003;
  object.rotation.y += 0.0003;
  particle.rotation.x += 0.00003;
  particle.rotation.y -= 0.0004;
  circle.rotation.x -= 0.002;
  circle.rotation.y -= 0.002;
  skelet.rotation.x -= 0.001;
  skelet.rotation.y += 0.001;
  for (mesh2 of particle.children) {
    if (mesh2.geometry instanceof THREE.TetrahedronGeometry) {
      mesh2.rotation.x += Math.random() * 0.003;
      mesh2.rotation.y += Math.random() * 0.003;
    }
  }

  for (mesh1 of particle.children) {
    if (mesh1.geometry instanceof THREE.TetrahedronGeometry) {
      mesh1.rotation.x += Math.random() * 0.03;
      mesh1.rotation.y += Math.random() * 0.03;
    }
  }

  renderer.render(scene, camera);
}
