(function () {
  var config = {
    apiKey: "AIzaSyCLoNdkDeyiO09zyiEpvVOubXExNSE-A5Y",
    authDomain: "platanitos-e4b00.firebaseapp.com",
    databaseURL: "https://platanitos-e4b00.firebaseio.com",
    projectId: "platanitos-e4b00",
    storageBucket: "platanitos-e4b00.appspot.com",
    messagingSenderId: "879145201085"
  };
  firebase.initializeApp(config);
  window.onload = initialize;

  var fileImage;
  var imagesReference;
  // imagenesFBRef

  function initialize() {
    fileImage = document.getElementById('files');
    fileImage.addEventListener('change', uploadImage, false);
    storageRef = firebase.storage().ref().child('imagenes');
    imagesReference = firebase.database().ref().child('imagenes')
    showImages();
  }

  function uploadImage() {
    var image = fileImage.files[0];
    document.getElementById("modal-photo").style.display = 'none';
    document.getElementById("modal-aceptar").style.display = 'block';
    document.getElementById("aceptar").addEventListener("click", function () {
      var uploadTask = storageRef.child(image.name).put(image)
      uploadTask.on('state_changed',
        function (snapshot) {},
        function (error) {
          alert('hubo un error');
        },
        function () {
          var downloadURL = uploadTask.snapshot.downloadURL;
          createNode(image.name, downloadURL);
        });
    });


  }

  function showImages() {
    imagesReference.on('value', function (snapshot) {
      var datos = snapshot.val();
      // console.log(datos)
      var result = "";
      for (var key in datos) {
        result += '<img class="img-output img-thumbnail"src="' + datos[key].url + '"/>';
      }
      document.getElementById('list').innerHTML = result;
    })

  }


  function createNode(nameImage, url) {
    imagesReference.push({
      nombre: nameImage,
      url: url
    });

  }
})()





    

    

