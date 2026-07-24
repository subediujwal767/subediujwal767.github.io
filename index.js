
    const text = "Creator | Developer | Passionate Learner";
    let index = 0;
    function typeEffect() {
        if (index < text.length) {
            document.getElementById("typing").innerHTML += text.charAt(index);
            index++;
            setTimeout(typeEffect, 90);
        }
    }

    window.onload = function() {
        typeEffect();
        
        const loginText = document.getElementById('login-text');
        const userAvatar = document.getElementById('user-avatar');
        const userName = document.getElementById('user-name');
        
        const savedPicture = localStorage.getItem("googleUserPicture");
        const savedName = localStorage.getItem("googleUserName");
        if (savedPicture) {
            userAvatar.src = savedPicture;
            if (savedName) userName.textContent = savedName;
            loginText.style.display = 'none';
            userAvatar.style.setProperty('display', 'block', 'important');
        }

        if (typeof google !== 'undefined' && google.accounts && google.accounts.id) {
            google.accounts.id.initialize({
                client_id: "152363843924-2q9v0m8t601te92q35jutfr8klu4o8qp.apps.googleusercontent.com",
                callback: handleCredentialResponse
            });
        }
    };

    window.onscroll = function() {
        let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        let scrolled = (winScroll / height) * 100;
        document.getElementById("progress").style.width = scrolled + "%";
        document.getElementById("topBtn").style.display = (winScroll > 200) ? "block" : "none";
    };

    function topFunction() { window.scrollTo({top: 0, behavior: 'smooth'}); }
    function showMessage() { alert("Hey, what's up? 🤠  Thanks for connecting with Me."); }

    function decodeJwtResponse(token) {
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        return JSON.parse(window.atob(base64));
    }

    function handleCredentialResponse(response) {
        const responsePayload = decodeJwtResponse(response.credential);
        const loginText = document.getElementById('login-text');
        const userAvatar = document.getElementById('user-avatar');
        const userName = document.getElementById('user-name');

        if (responsePayload.picture) {
            userAvatar.src = responsePayload.picture;
            userName.textContent = responsePayload.name || "User Account";
            loginText.style.display = 'none';
            userAvatar.style.setProperty('display', 'block', 'important'); 

            localStorage.setItem("googleUserPicture", responsePayload.picture);
            localStorage.setItem("googleUserName", responsePayload.name || "User Account");
        }
    }

    document.getElementById('login-text').addEventListener('click', () => {
        if (typeof google !== 'undefined' && google.accounts && google.accounts.id) {
            google.accounts.id.prompt((notification) => {
                if (notification.isNotDisplayed()) {
                    alert("Google login overlay blocked. Please check your browser tracking/popup blockers!");
                }
            });
        } else {
            alert("The login system is still loading. Please try again in 2 seconds!");
        }
    });

    document.getElementById('user-avatar').addEventListener('click', (e) => {
        e.stopPropagation();
        document.getElementById('nav-dropdown').classList.remove('show');
        document.getElementById('menu-trigger-btn').classList.remove('active');
        document.getElementById('auth-dropdown').classList.toggle('show');
    });

    document.getElementById('menu-trigger-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        document.getElementById('auth-dropdown').classList.remove('show');
        document.getElementById('menu-trigger-btn').classList.toggle('active');
        document.getElementById('nav-dropdown').classList.toggle('show');
    });

    window.addEventListener('click', () => {
        document.getElementById('auth-dropdown').classList.remove('show');
        document.getElementById('nav-dropdown').classList.remove('show');
        document.getElementById('menu-trigger-btn').classList.remove('active');
    });

    document.getElementById('logout-btn').addEventListener('click', () => {
        localStorage.removeItem("googleUserPicture");
        localStorage.removeItem("googleUserName");
        location.reload();
    });
