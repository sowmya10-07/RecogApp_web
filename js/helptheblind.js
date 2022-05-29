$(document).ready(function () {
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
              document.getElementById("load").innerHTML = "Recognizing expressions....";
              const detections = await faceapi
                .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
                .withFaceLandmarks()
                .withFaceExpressions()
                .withAgeAndGender();
              let expressions = detections[0].expressions;
              let exp = [expressions.angry,expressions.disgusted,expressions.fearful,expressions.happy,expressions.neutral,expressions.sad,expressions.surprised]
              let maxexp = Math.max(expressions.angry,expressions.disgusted,expressions.fearful,expressions.happy,expressions.neutral,expressions.sad,expressions.surprised)
              if(detections){
                  speak(exp,maxexp);
              }
            }, 6000);
          });
      
            function speak(exp,maxexp){
                let i=0;
                for(i=0;i<=6;i++){
                    if(maxexp==exp[i])
                    break;
                }
                if(i==0)window.speechSynthesis.speak(new SpeechSynthesisUtterance('The person is angry'));
                else if(i==1)window.speechSynthesis.speak(new SpeechSynthesisUtterance('The person is feeling disgusted'));
                else if(i==2)window.speechSynthesis.speak(new SpeechSynthesisUtterance('The person is feeling fearful'));
                else if(i==3)window.speechSynthesis.speak(new SpeechSynthesisUtterance('The person is happy'));
                else if(i==4)window.speechSynthesis.speak(new SpeechSynthesisUtterance('The person is neutral'));
                else if(i==5)window.speechSynthesis.speak(new SpeechSynthesisUtterance('The person is sad'));
                else if(i==6)window.speechSynthesis.speak(new SpeechSynthesisUtterance('The person is surprised'));
            }
        }
        face()
  })
  