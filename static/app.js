// Dropzone.autoDiscover = false;

// function init() {
//     let dz = new Dropzone("#dropzone", {
//         url: "/",
//         maxFiles: 1,
//         addRemoveLinks: true,
//         dictDefaultMessage: "Some Message",
//         autoProcessQueue: false
//     });
    
//     dz.on("addedfile", function() {
//         if (dz.files[1]!=null) {
//             dz.removeFile(dz.files[0]);        
//         }
//     });

//     dz.on("complete", function (file) {
//         let imageData = file.dataURL;
        
//         var url = "http://127.0.0.1:5000/classify_image";

//         $.post(url, {
//             image_data: file.dataURL
//         },function(data, status) {
//             /* 
//             Below is a sample response if you have two faces in an image lets say virat and roger together.
//             Most of the time if there is one person in the image you will get only one element in below array
//             data = [
//                 {
//                     class: "viral_kohli",
//                     class_probability: [1.05, 12.67, 22.00, 4.5, 91.56],
//                     class_dictionary: {
//                         lionel_messi: 0,
//                         maria_sharapova: 1,
//                         roger_federer: 2,
//                         serena_williams: 3,
//                         virat_kohli: 4
//                     }
//                 },
//                 {
//                     class: "roder_federer",
//                     class_probability: [7.02, 23.7, 52.00, 6.1, 1.62],
//                     class_dictionary: {
//                         lionel_messi: 0,
//                         maria_sharapova: 1,
//                         roger_federer: 2,
//                         serena_williams: 3,
//                         virat_kohli: 4
//                     }
//                 }
//             ]
//             */
//             console.log(data);
//             if (!data || data.length==0) {
//                 $("#resultHolder").hide();
//                 $("#divClassTable").hide();                
//                 $("#error").show();
//                 return;
//             }
//             let players = ["chiranjeevi", "deepika_padukone", "nani", "prabhas", "priyanka_chopra","ram_charan"];
            
//             let match = null;
//             let bestScore = -1;
//             for (let i=0;i<data.length;++i) {
//                 let maxScoreForThisClass = Math.max(...data[i].class_probability);
//                 if(maxScoreForThisClass>bestScore) {
//                     match = data[i];
//                     bestScore = maxScoreForThisClass;
//                 }
//             }
//             if (match) {
//                 $("#error").hide();
//                 $("#resultHolder").show();
//                 $("#divClassTable").show();
//                 $("#resultHolder").html($(`[data-player="${match.class}"`).html());
//                 // $("#resultHolder").html($(`[data-player="${match.class.toLowerCase()}"`).html());

//                 let classDictionary = match.class_dictionary;
//                 for(let personName in classDictionary) {
//                     let index = classDictionary[personName];
//                     let proabilityScore = match.class_probability[index];
//                     let elementName = "#score_" + personName;
//                     $(elementName).html(proabilityScore);
//                 }
//             }
//             // dz.removeFile(file);            
//         });
//     });

//     $("#submitBtn").on('click', function (e) {
//         dz.processQueue();		
//     });
// }

// $(document).ready(function() {
//     console.log( "ready!" );
//     $("#error").hide();
//     $("#resultHolder").hide();
//     $("#divClassTable").hide();

//     init();
// });


// Disable Dropzone's auto-discovery
// Dropzone.autoDiscover = false;

// function init() {
//     let dz = new Dropzone("#dropzone", {
//         url: "/", // URL is irrelevant because we handle uploads manually
//         maxFiles: 1, // Allow only one file
//         addRemoveLinks: true, // Add 'Remove' button for files
//         dictDefaultMessage: "Drop files here or click to upload", // Default message
//         autoProcessQueue: false // Disable automatic uploads
//     });

//     // Ensure only one file is in the Dropzone
//     dz.on("addedfile", function () {
//         if (dz.files[1] != null) {
//             dz.removeFile(dz.files[0]);
//         }
//         console.log("File added to Dropzone:", dz.files[0]);
//     });

//     // Handle "Classify" button click
//     $("#submitBtn").on("click", function () {
//         console.log("Classify button clicked. Processing queue...");
//         dz.processQueue(); // Manually process the Dropzone queue
//     });

//     // Handle file processing after classification request
//     dz.on("complete", function (file) {
//         console.log("Processing file:", file);

//         if (!file || !file.dataURL) {
//             console.error("No file or file data available");
//             return;
//         }

//         let imageData = file.dataURL; // Extract image data
//         let url = "http://127.0.0.1:5000/classify_image"; // Flask backend route

//         // Make the POST request
//         console.log("Sending POST request to:", url);
//         $.ajax({
//             type: "POST",
//             url: url,
//             data: { image_data: imageData },
//             success: function (data) {
//                 console.log("Response Data:", data);

//                 if (!data || data.length === 0) {
//                     console.warn("No data received or empty response.");
//                     $("#resultHolder").hide();
//                     $("#divClassTable").hide();
//                     $("#error").show();
//                     return;
//                 }

//                 let players = ["chiranjeevi", "deepika_padukone", "nani", "prabhas", "priyanka_chopra", "ram_charan"];
//                 let match = null;
//                 let bestScore = -1;

//                 // Find the best match based on probability scores
//                 for (let i = 0; i < data.length; ++i) {
//                     let maxScoreForThisClass = Math.max(...data[i].class_probability);
//                     if (maxScoreForThisClass > bestScore) {
//                         match = data[i];
//                         bestScore = maxScoreForThisClass;
//                     }
//                 }

//                 if (match) {
//                     console.log("Best match found:", match);

//                     // Show result holder
//                     $("#error").hide();
//                     $("#resultHolder").show();
//                     $("#divClassTable").show();

//                     // Update the result holder with the matched celebrity's HTML
//                     let matchedHtml = $(`[data-player="${match.class}"]`).html();
//                     if (matchedHtml) {
//                         $("#resultHolder").html(matchedHtml);
//                     } else {
//                         console.error(`No matching element found for class: ${match.class}`);
//                     }

//                     // Populate the probability table
//                     let classDictionary = match.class_dictionary;
//                     for (let personName in classDictionary) {
//                         let index = classDictionary[personName];
//                         let probabilityScore = match.class_probability[index];
//                         let elementName = "#score_" + personName;

//                         if ($(elementName).length) {
//                             $(elementName).html(probabilityScore.toFixed(2)); // Display with 2 decimal places
//                         } else {
//                             console.warn(`Element not found for ${personName}`);
//                         }
//                     }
//                 } else {
//                     console.warn("No matching class found.");
//                     $("#error").show();
//                     $("#resultHolder").hide();
//                     $("#divClassTable").hide();
//                 }
//             },
//             error: function (error) {
//                 console.error("Error in POST request:", error);
//                 $("#resultHolder").hide();
//                 $("#divClassTable").hide();
//                 $("#error").show();
//             },
//         });
//     });
// }

// $(document).ready(function () {
//     console.log("Page ready!");
//     $("#error").hide();
//     $("#resultHolder").hide();
//     $("#divClassTable").hide();

//     init(); // Initialize Dropzone and other handlers
// });


////// Woeking code above after deploying not displaying result so checking below code


// Disable Dropzone's auto-discovery
Dropzone.autoDiscover = false;

function init() {
    let dz = new Dropzone("#dropzone", {
        url: "/", // URL is irrelevant because we handle uploads manually
        maxFiles: 1, // Allow only one file
        addRemoveLinks: true, // Add 'Remove' button for files
        dictDefaultMessage: "Drop files here or click to upload", // Default message
        autoProcessQueue: false // Disable automatic uploads
    });

    // Ensure only one file is in the Dropzone
    dz.on("addedfile", function () {
        if (dz.files[1] != null) {
            dz.removeFile(dz.files[0]);
        }
        console.log("File added to Dropzone:", dz.files[0]);
    });

    // Handle "Classify" button click
    $("#submitBtn").on("click", function () {
        console.log("Classify button clicked. Processing queue...");
        dz.processQueue(); // Manually process the Dropzone queue
    });

    // Handle file processing after classification request
    dz.on("complete", function (file) {
        console.log("Processing file:", file);

        if (!file || !file.dataURL) {
            console.error("No file or file data available");
            return;
        }

        let imageData = file.dataURL; // Extract image data
        let url = window.location.origin + "/classify_image"; // Dynamically set the backend route

        // Show loading spinner
        $("#loading").show();
        $("#error").hide();
        $("#resultHolder").hide();
        $("#divClassTable").hide();

        // Make the POST request
        console.log("Sending POST request to:", url);
        $.ajax({
            type: "POST",
            url: url,
            data: { image_data: imageData },
            success: function (data) {
                console.log("Response Data:", data);

                $("#loading").hide();

                if (!data || data.length === 0) {
                    console.warn("No data received or empty response.");
                    $("#resultHolder").hide();
                    $("#divClassTable").hide();
                    $("#error").show();
                    return;
                }

                let players = ["chiranjeevi", "deepika_padukone", "nani", "prabhas", "priyanka_chopra", "ram_charan"];
                let match = null;
                let bestScore = -1;

                // Find the best match based on probability scores
                for (let i = 0; i < data.length; ++i) {
                    let maxScoreForThisClass = Math.max(...data[i].class_probability);
                    if (maxScoreForThisClass > bestScore) {
                        match = data[i];
                        bestScore = maxScoreForThisClass;
                    }
                }

                if (match) {
                    console.log("Best match found:", match);

                    $("#error").hide();
                    $("#resultHolder").show();
                    $("#divClassTable").show();

                    // Update result holder
                    let matchedHtml = $(`[data-player="${match.class}"]`).html();
                    if (matchedHtml) {
                        $("#resultHolder").html(matchedHtml);
                    } else {
                        console.error(`No matching element found for class: ${match.class}`);
                    }

                    // Populate probability table
                    let classDictionary = match.class_dictionary;
                    for (let personName in classDictionary) {
                        let index = classDictionary[personName];
                        let probabilityScore = match.class_probability[index];
                        let elementName = "#score_" + personName;

                        if ($(elementName).length) {
                            if (probabilityScore != null && !isNaN(probabilityScore)) {
                                $(elementName).html(probabilityScore.toFixed(2));
                            } else {
                                $(elementName).html("N/A");
                            }
                        } else {
                            console.warn(`Element not found for ${personName}`);
                        }
                    }
                } else {
                    console.warn("No matching class found.");
                    $("#error").show();
                    $("#resultHolder").hide();
                    $("#divClassTable").hide();
                }
            },
            error: function (xhr, status, error) {
                console.error("Error in POST request:", {
                    status: status,
                    error: error,
                    responseText: xhr.responseText,
                });
                $("#loading").hide();
                $("#resultHolder").hide();
                $("#divClassTable").hide();
                $("#error").show();
            },
        });
    });
}

$(document).ready(function () {
    console.log("Page ready!");
    $("#error").hide();
    $("#resultHolder").hide();
    $("#divClassTable").hide();
    $("#loading").hide();

    init(); // Initialize Dropzone and other handlers
});
