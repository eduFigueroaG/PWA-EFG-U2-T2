if (navigator.serviceWorker) {
    let url = ''
    const BASE_URL = window.location.href
    BASE_URL.startsWith('https:') ? url = '/PWA-EFG-U2-T2/sw.js' : url = "/sw.js"
    navigator.serviceWorker.register(url)
}

let player = $("#player");
let photoUser = $("#photoUser");
let btnCamera = $("#btnCamera");
let btnCameraBack = $("#btnCameraBack");
let btnTakePhoto = $("#btnTakePhoto");

const camera = new Camera(player[0]);

btnCamera.on("click", () => {
    camera.on().then((result) => {
        if (!result) {
            alert("Error al iniciar la camara")
        }
    });
});

btnCameraBack.on("click", () => {
    camera.onBack().then((result) => {
        if (!result) {
            alert("Error, no cuentas con dispositivo multimedia")
        }
    });
});

btnTakePhoto.on("click", async() => {

    camera.off();
    const [foto, tipo] = camera.takePhoto();
    const photo = `
    <div class="d-flex justify-content-center">
    <div class="card bg-light mb-3 m-4" style="max-width: 18rem;">
    <div class="card-header">${tipo}</div>
    <div class="card-body">
    <img class="card-img-top" src="${foto}" alt="Card image cap">
    </div>
    </div>
    </div>`;
    $("#photoContainer").append(photo);
});