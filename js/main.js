let user
let posts

var signInButton = document.getElementsByClassName('myButton')[0];
var registerButton = document.getElementsByClassName('myButton')[1];
var chatbox = document.getElementsByClassName('main-top')[0].appendChild(document.createElement('div'))
chatbox.classList.add('chatbox')

function showButtons() {
    signInButton.style.display = 'unset'
    registerButton.style.display = 'unset'
}

function hideButtons() {
    signInButton.style.display = 'none'
    registerButton.style.display = 'none'
}

var signInForm = (function () {
        let formContainer = document.createElement( 'form')
        formContainer.classList.add('signin-container')
        formContainer.appendChild(document.createElement('h1')).textContent='Login'

        let emailLabel = formContainer.appendChild(document.createElement('label'))
        emailLabel.setAttribute('for','email')
        emailLabel.appendChild(document.createElement('b')).textContent='Email*'
        let emailInput= formContainer.appendChild(document.createElement('input'))
        emailInput.classList.add('inputBox')
        emailInput.setAttribute('type','text')
        emailInput.setAttribute('placeholder','Enter Email')
        emailInput.setAttribute('name','email')
        emailInput.setAttribute('required', 'true')

        let pwdLabel = formContainer.appendChild(document.createElement('label'))
        pwdLabel.setAttribute('for','pwd')
        pwdLabel.appendChild(document.createElement('b')).textContent='Password*'
        let pwnInput= formContainer.appendChild(document.createElement('input'))
        pwnInput.classList.add('inputBox')
        pwnInput.setAttribute('type','password')
        pwnInput.setAttribute('placeholder','Enter Password')
        pwnInput.setAttribute('name','pwd')
        pwnInput.setAttribute('required', 'true')

        let loginBtn= formContainer.appendChild(document.createElement('button'))
        loginBtn.setAttribute('type','submit')
        loginBtn.classList.add('btn')
        loginBtn.textContent = 'Login'

        formContainer.addEventListener("submit", async function (event) {
            event.preventDefault()
            let tmp
            await Promise.all ( [
                getUserData ( emailInput.value).then ( x => tmp = x )
            ] )

            if (tmp.name && tmp.authKey === Sha256.hash(pwnInput.value)) {
                alert("You are registered")
                user = new User(tmp.name, tmp.email, tmp.avatart)
                formContainer.style.display = 'none'
                chatbox.style.display = 'unset'

            } else {
                alert("Wrong User name or Password")
                formContainer.style.display = 'none'
                showButtons()
            }
        });

        let cancelBtn= formContainer.appendChild(document.createElement('button'))
        cancelBtn.setAttribute('type','submit')
        cancelBtn.classList.add('btn','cancel')
        cancelBtn.textContent = 'Cancel'


        cancelBtn.onclick = function () {
            event.preventDefault()
            formContainer.style.display = 'none'
            showButtons()
        }

        return formContainer
    }
)()

var registerForm = (function () {
        let formContainer = document.createElement('form')
        formContainer.classList.add('signin-container')
        formContainer.setAttribute('method','POST')
        formContainer.appendChild(document.createElement('h1')).textContent='Register'
        formContainer.appendChild(document.createElement('p')).textContent='Please fill in this form to create an account'
        formContainer.appendChild(document.createElement('hr'))

        let userName = formContainer.appendChild(document.createElement('label'))
        userName.setAttribute('for','name')
        userName.appendChild(document.createElement('b')).textContent='Name*'
        let userNameInput= formContainer.appendChild(document.createElement('input'))
        userNameInput.classList.add('inputBox')
        userNameInput.setAttribute('type','text')
        userNameInput.setAttribute('placeholder','Enter Nem User Name')
        userNameInput.setAttribute('name','userName')
        userNameInput.setAttribute('required', 'true')

        let emailLabel = formContainer.appendChild(document.createElement('label'))
        emailLabel.setAttribute('for','email')
        emailLabel.appendChild(document.createElement('b')).textContent='Email*'
        let emailInput= formContainer.appendChild(document.createElement('input'))
        emailInput.classList.add('inputBox')
        emailInput.setAttribute('type','text')
        emailInput.setAttribute('placeholder','Enter Email')
        emailInput.setAttribute('name','email')
        emailInput.setAttribute('required', 'true')

        let pwdLabel = formContainer.appendChild(document.createElement('label'))
        pwdLabel.setAttribute('for','pwd')
        pwdLabel.appendChild(document.createElement('b')).textContent='Password*'
        let pwnInput= formContainer.appendChild(document.createElement('input'))
        pwnInput.classList.add('inputBox')
        pwnInput.setAttribute('type','password')
        pwnInput.setAttribute('placeholder','Enter Password')
        pwnInput.setAttribute('name','pwd')
        pwnInput.setAttribute('required', 'true')

        let pwdRepLabel = formContainer.appendChild(document.createElement('label'))
        pwdRepLabel.setAttribute('for','pwd')
        pwdRepLabel.appendChild(document.createElement('b')).textContent='Repeat Password*'
        let pwnRepInput= formContainer.appendChild(document.createElement('input'))
        pwnRepInput.classList.add('inputBox')
        pwnRepInput.setAttribute('type','password')
        pwnRepInput.setAttribute('placeholder','Repeat Password')
        pwnRepInput.setAttribute('name','pwdRep')
        pwnRepInput.setAttribute('required', 'true')

        let avatartUrl = formContainer.appendChild(document.createElement('label'))
        avatartUrl.setAttribute('for','avatar')
        avatartUrl.appendChild(document.createElement('b')).textContent='Avatar - URL'
        let avatarInput= formContainer.appendChild(document.createElement('input'))
        avatarInput.classList.add('inputBox')
        avatarInput.setAttribute('type','url')
        avatarInput.setAttribute('placeholder','URL to your avatar')
        avatarInput.setAttribute('name','avatar')

        let loginBtn= formContainer.appendChild(document.createElement('button'))
        loginBtn.setAttribute('type','submit')
        loginBtn.classList.add('btn')
        loginBtn.textContent = 'Register'

        formContainer.addEventListener("submit", function (event) {
            event.preventDefault()
            registerNewUser(formContainer)
            formContainer.style.display = 'none'
            showButtons()
        });

        let cancelBtn= formContainer.appendChild(document.createElement('button'))
        cancelBtn.setAttribute('type','submit')
        cancelBtn.classList.add('btn','cancel')
        cancelBtn.textContent = 'Cancel'

        cancelBtn.onclick = function () {
            event.preventDefault()
            formContainer.style.display = 'none'
           showButtons()
        }

        return formContainer
    }
)()


function registerNewUser(formContainer) {
    var formData_ = new FormData(formContainer);

    fetch ( 'http://localhost:3000/users', {
        method: 'POST',
        body: JSON.stringify ({
            id: formData_.get('email'),
            name: formData_.get('userName'),
            email: formData_.get('email'),
            avatart: formData_.get('avatar'),
            authKey: Sha256.hash(formData_.get('pwd'))
        }),
        headers: {
            "Content-type": "application/json"
        }
    })
}

function postComment(comment) {

    fetch ( 'http://localhost:3000/comments', {
        method: 'POST',
        body: JSON.stringify ({
            userID: user._name,
            message: comment,
        }),
        headers: {
            "Content-type": "application/json"
        }
    })
}

let getUserData =  function ( user ) {
    return fetch ( 'http://localhost:3000/users/' + user )
        .then (response => response.json())
}


document.getElementsByClassName('main-top')[0].appendChild(signInForm)
document.getElementsByClassName('main-top')[0].appendChild(registerForm)

chatbox.appendChild(User.prototype.messageBox)
chatbox.appendChild(User.prototype.userInputBox)

function signIn() {
    hideButtons()
    signInForm.style.display = 'unset';
}

function registerUser() {
    hideButtons()
    registerForm.style.display = 'unset';
}

