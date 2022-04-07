async function signUp() {
    let username = document.getElementById("usernameField").value;
    let email = document.getElementById("emailField").value;
    let phoneNumber = document.getElementById("phoneNumberField").value;
    let password = document.getElementById("passwordField").value;
    await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            verifyEmail();
            addData(username, email, phoneNumber);
            window.alert("Account created successfully!")
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            window.alert("Unable to create account!")
        });
}

async function addData(username, email, phoneNumber) {
    var db = firebase.firestore();
    console.log("added data")
    await db.collection("users").doc(email).set({
        Username: username,
        Email: email,
        PhoneNumber: phoneNumber,
        Verified: false,
        LastLoggedIn: null,
        NumberOfLogins: 0
    })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
        });
    window.location = "login.html"
}

async function signIn() {
    let email = document.getElementById("emailField").value;
    let password = document.getElementById("passwordField").value;
    var db = firebase.firestore();
    await firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            updateData(email);
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            window.alert("Invalid Email or Password!")
        });
}

async function updateData(email) {
    var db = firebase.firestore();
    var currentdate = new Date();
    var datetime = currentdate.getDate() + "/"
        + (currentdate.getMonth() + 1) + "/"
        + currentdate.getFullYear() + " @ "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes()
    var numOfLogins;
    await db.collection("users").doc(email).get().then((doc) => {
        numOfLogins = doc.data().NumberOfLogins
    });
    if (firebase.auth().currentUser.emailVerified == true) {
        await db.collection("users").doc(email).update({
            Verified: true,
            LastLoggedIn: datetime,
            NumberOfLogins: numOfLogins + 1
        })
    }
    window.location = "interface.html"
}

function signOut() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        window.location = "login.html"
    }).catch((error) => {
        // An error happened.
    });
}

function requestResetEmail() {
    let email = document.getElementById("emailField").value;
    console.log("Sending email...")

    // Send email to rest
    firebase.auth().sendPasswordResetEmail(email).then(function () {
        // Email sent.
        console.log('Password reset email sent successfully!')
        window.alert("Password reset email sent successfully!")
        window.location = "login.html"
    }).catch(function (error) {
        // An error happened.
        window.alert("Failed to send email.")
    });
}

async function verifyEmail() {
    firebase.auth().currentUser.sendEmailVerification()
        .then(() => {
            // Email verification sent!
            // ...
        });
}

async function adminSignIn(){
    let email = document.getElementById("emailField").value;
    let password = document.getElementById("passwordField").value;
    
    var db = firebase.firestore();
    const userRef = db.collection('admins').doc(email);
    const doc = await userRef.get();
    if (!doc.exists) {
        window.alert("No such Admin")
    } else {
        var data = doc.data();
        var checkPassword = data.AdminKey;
            
        if (password.normalize() === checkPassword.normalize()){
            window.location = "superUser.html"
        }
        else{
            window.alert("Incorrect Admin Key BEEP BOOP")
        }
    }
    
    
}