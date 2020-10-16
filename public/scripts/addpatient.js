var URL = location.protocol + '//' + location.host;

$(document).ready(function() {
    var symptomsAPI = URL + "/app/getsymptoms";
    $.getJSON(symptomsAPI).done(function(allSymptoms) {
         var symptomsScoresCheckboxes = [];

         for(var symptom in allSymptoms) {
             var symptomScoreCheckbox = [];
             symptomScoreCheckbox[0] = symptom;
             symptomScoreCheckbox[1] = allSymptoms[symptom]; // This is the score.

             var input = "<input type=\"checkbox\" name=\"PD[]\" value=\"" + symptom + "\">";
             symptomScoreCheckbox[2] = input;

             symptomsScoresCheckboxes.push(symptomScoreCheckbox)
         }

         $('#add-new-patient').dataTable({
               data: symptomsScoresCheckboxes,
               columns:
               [
                   {
                       title: "Symptom"
                   },
                   {
                       title: "Score"
                   },
                   {
                       title: "Diagnosis"
                   },
               ],
               scrollY: '40vh',
               scrollCollapse: true,
               paging: false,
               info: false,
               language: {
                 sSearch: "Search symptom"
               }
          });
     });
});

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-97568701-1', 'auto');
ga('send', 'pageview');
