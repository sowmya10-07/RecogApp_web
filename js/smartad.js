$(document).ready(function () {
  $("#start").click(function(){
    document.getElementById("load").innerHTML = "Setting up camera. This may take some time. Please wait."
    async function face() {
  
      const MODEL_URL = '/models'
  
      await faceapi.loadSsdMobilenetv1Model(MODEL_URL)
      await faceapi.loadTinyFaceDetectorModel(MODEL_URL)
      await faceapi.loadFaceLandmarkModel(MODEL_URL)
      await faceapi.loadFaceRecognitionModel(MODEL_URL)
      await faceapi.loadFaceExpressionModel(MODEL_URL)
      await faceapi.loadAgeGenderModel(MODEL_URL)
  
      const video = document.getElementById("video");
  
      navigator.mediaDevices.getUserMedia({
         video: {}, }).then((stream)=>{
           video.srcObject = stream;
         });
  
      video.addEventListener("playing", () => {
        setInterval(async () => {
          document.getElementById("load").innerHTML = "Detecting Age and Gender....";
          const detections = await faceapi
            .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceExpressions()
            .withAgeAndGender();
          let age = detections[0].age;
          let gender = detections[0].gender;
          if(detections){
            showage(age, gender);
            displayadd(age,gender);
          }
        }, 500);
      });
  
        function showage(age, gender) {
        document.getElementById("age").innerHTML = age
        document.getElementById("gender").innerHTML = gender
      }
  
      function displayadd(age, gender){
        if(age<=10 )
        document.getElementById("display").src="../images/below10.jpg";
        else if(age>10 && age <=20 ){
          if(gender=="female")
          document.getElementById("display").src="../images/10to20f.jpg";
          else if(gender=="male")
          document.getElementById("display").src="../images/10to20m.jpg";
        }
        else if(age>20 && age<=30){
          if(gender=="female")
          document.getElementById("display").src="../images/20to30f.jpg";
          else if(gender=="male")
          document.getElementById("display").src="../images/20to30m.jpg";
        }
        else if(age>30 && age<=40){
          if(gender=="female")
          document.getElementById("display").src="../images/30to40f.png";
          else if(gender=="male")
          document.getElementById("display").src="../images/30to40m.jpg";
        }
        else if(age>40 && age<=60){
          document.getElementById("display").src="../images/40to60.jpg";
  
        }
        else if(age>60)
        document.getElementById("display").src="../images/60above.jpg";
  
      }
  
    }
    face()
  });
})
