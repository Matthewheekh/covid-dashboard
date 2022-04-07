var students = [];

async function getUsersData() {
    var db = firebase.firestore();
    await db.collection("users").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            students.push(doc.data());
        });
    });
}

async function displayUsersData() {
    await getUsersData();
    let tableInformationReference = document.getElementById("table-information")
    let htmlDisplay = `<div class="mdl-cell mdl-cell--3-col center table-header">Username</div>
                        <div class="mdl-cell mdl-cell--3-col center table-header">Email Address</div>
                        <div class="mdl-cell mdl-cell--2-col center table-header">Phone Number</div>
                        <div class="mdl-cell mdl-cell--2-col center table-header">Number of Logins</div>
                        <div class="mdl-cell mdl-cell--2-col center table-header">Latest Login Date</div>`

    for (let i = 0; i < students.length; i++) {
        if (students[i].Verified == true) {
            htmlDisplay += `<div class="mdl-cell mdl-cell--3-col center table-info">${students[i].Username}</div>
                            <div class="mdl-cell mdl-cell--3-col center table-info">${students[i].Email}</div>
                            <div class="mdl-cell mdl-cell--2-col center table-info">${students[i].PhoneNumber}</div>
                            <div class="mdl-cell mdl-cell--2-col center table-info">${students[i].NumberOfLogins}</div>
                            <div class="mdl-cell mdl-cell--2-col center table-info">${students[i].LastLoggedIn}</div>`

        }
    }
    tableInformationReference.innerHTML = htmlDisplay
}