const xhr = {

    $message: null,

    set: (e) => {
        localStorage.message = e.currentTarget.value;
    },

    bind: () => {
        xhr.$message.innerText = localStorage.message;
    },

    setAndBind: (e) => {
        xhr.set(e);
        xhr.bind();
    },

    load: () => {
        xhr.$message = document.querySelector('.message-box');
        xhr.bind();
    }

};

window.addEventListener('DOMContentLoaded', xhr.load);