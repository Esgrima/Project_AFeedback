angular.module('listings').controller('ListingsController', ['$scope', 'Listings',
  function($scope, Listings) {
    //Stores Variable for Current User Info, Role/Lastname/FirstName/etc.
    Listings.getUser().then(function(response) {
      $scope.companyName = response.data[0].firstname;

    },function(error) {
      console.log('Unable to retrieve listings:', error);
    });

    $scope.jobs = [
        {
            id: 123456,
            company: "Google",
            name: "Software Eng. II",
            totalApplicants: 5,
            unreviewedApplicants: 2,
            params: ["Critical Thinking", "Leadership", "Teamwork"],
            applications: [
                {"rank": 2, "applicantName": "Luis", "Critical Thinking": 1, "Leadership": 2, "Teamwork": 3 },
                {"rank": 1, "applicantName": "Rex", "Critical Thinking": 7, "Leadership": 2, "Teamwork": 5 }
            ]
        },
        {
            id: 1234526,
            company: "Real Truck",
            name: "Database Specialist",
            totalApplicants: 5,
            unreviewedApplicants: 2,
            params: ["Positivity", "Leadership", "Teamwork"],
            applications: [
                {"rank": 2, "applicantName": "Luis", "Positivity": 1, "Leadership": 2, "Teamwork": 3 },
                {"rank": 1, "applicantName": "Rex", "Positivity": 7, "Leadership": 2, "Teamwork": 5 }
            ]
        },
        {
            id: 1232456,
            company: "Real Truck",
            name: "Front End Developer",
            totalApplicants: 5,
            unreviewedApplicants: 2,
            params: ["Critical Thinking", "Leadership", "Teamwork"],
            applications: [
                {"rank": 2, "applicantName": "Tom", "Critical Thinking": 1, "Leadership": 2, "Teamwork": 3 },
                {"rank": 1, "applicantName": "Michael", "Critical Thinking": 7, "Leadership": 2, "Teamwork": 5 }
            ]
        },
        {
            id: 1243456,
            company: "Infinite Energy",
            name: "Data Analyst",
            totalApplicants: 5,
            unreviewedApplicants: 2,
            params: ["Critical Thinking", "Leadership", "Teamwork"],
            applications: [
                {"rank": 2, "applicantName": "Luis", "Critical Thinking": 1, "Leadership": 2, "Teamwork": 3 },
                {"rank": 1, "applicantName": "Rex", "Critical Thinking": 7, "Leadership": 2, "Teamwork": 5 }
            ]
        },
        {
            id: 123456,
            company: "Infinite Energy",
            name: "Software Engineering Intern",
            totalApplicants: 5,
            unreviewedApplicants: 2,
            params: ["Critical Thinking", "Leadership", "Teamwork"],
            applications: [
                {"rank": 2, "applicantName": "Luis", "Critical Thinking": 1, "Leadership": 2, "Teamwork": 3 },
                {"rank": 1, "applicantName": "Raymond", "Critical Thinking": 7, "Leadership": 2, "Teamwork": 5 }
            ]
        }
    ];

    //Displays jobs for a specific company
    $scope.displayJobs = function(){
      for (i = 0; i < $scope.jobs.length; i++) {
        if($scope.user.firstname == $scope.jobs[i].company){
          $scope.listedJobs.push($scope.jobs[i])
        }
      }
    };

    $scope.setChart = function(){
      for (i = 0; i < $scope.jobs.length; i++) {
        if($scope.user.firstname == $scope.jobs[i].company){
          $scope.listedJobs.push($scope.jobs[i])
        }
      }
    };

  // Data Tables
      $(document).ready(function() {
          $('.applicantTable').DataTable( {
              lengthChange: false,
              columnDefs: [
                  {
                      targets: [ 0, 1, 2 ],
                      className: 'mdl-data-table__cell--non-numeric'
                  }
              ]
          } );
      } );

      $scope.toggleElement = function(element){
          var toggleElement = element.children('.applicantTable');
          console.log(toggleElement);
          if(toggleElement.style.display != "none"){
              toggleElement.style.display = "none";
          }else{
              toggleElement.style.display = "block";
          }
      }

      $scope.showForm = function(){
          document.getElementById("table").style.display = "none";
          document.getElementById("new-listing").style.display = "block";
          // console.log(elem1);
          // console.log(elem2);
      };

      $scope.showRoles = function(){
          document.getElementById("table").style.display = "block";
          document.getElementById("new-listing").style.display = "none" ;
          // console.log(elem1);
          // console.log(elem2);
      };

    
      $scope.addRole = function( _role_name){
        var paramList = $scope.paramString.match(/[^\s,]+/g);
        var entry = {
            id: 123456,
            company: "Google",
            name: _role_name,
            totalApplicants: 0,
            unreviewedApplicants: 0,
            params: paramList,
            applications: []
        }

        if(entry.params != -1){
            $scope.jobs.push(entry);
        }
    };

  /*
      Implement these functions in the controller to make your application function
      as described in the assignment spec.
     */
    $scope.addListing = function(code_, name_, latitude_,longitude_,address_) {
      var obj = {
        "code": code_,
        "name": name_,
        "coordinates": {
          "latitude": latitude_,
          "longitude": longitude_,
        },
        "address": address_
      };
      $scope.listings.push(obj);
    };

  }
]);
