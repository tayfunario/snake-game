// selectors
const izgara = document.querySelector('.izgara')
const skor_tahtasi = document.querySelector('.skor-tahtasi')
const puan_SPAN = document.querySelector('#puan')

// değişkenler
let yon = 'aşağı'
let yilan = []
let yem = null
let anaInterval
let dur = false
let puan = 0

// --------------fonksiyonlar
function kutucuklariYukle() {
    for (let i = 0; i < 400; i++) {
        const kutucuk = document.createElement('div')
        kutucuk.classList.add('kutucuk')
        kutucuk.setAttribute('data-id', i)
        izgara.appendChild(kutucuk)
    }
}

function yilaniYarat() {
    const seciliKutu = izgara.childNodes[70]
    const seciliKutuID = seciliKutu.dataset.id
    yilan.push(seciliKutuID)
    yilan.push(seciliKutuID - 20)
    yilan.push(seciliKutuID - 40)

}

function yilaniGoster() {
    // bütün kutucukları kırmızı yap
    for (let j of izgara.childNodes) {
        j.style.background = 'red'
    }
    // sonra yılanı boya
    for (let i of yilan) {
        izgara.childNodes[i].style.background = 'black'
    }
    // sonra da yemi 
    izgara.childNodes[yem].style.background = 'blue'
}

// bu fonksiyon sadece arkaplanda yılanı hareket ettiriyor ve yukarı/aşağı çarptı mı onu kontrol ediyor
function hareketEt() {
    if (yon == 'aşağı') {
        yilan.unshift(parseInt(yilan[0]) + 20)
        yilan.pop()
    } else if (yon == 'sağ') {
        yilan.unshift(parseInt(yilan[0]) + 1)
        yilan.pop()
    } else if (yon == 'sol') {
        yilan.unshift(parseInt(yilan[0]) - 1)
        yilan.pop()
    } else if (yon == 'yukarı') {
        yilan.unshift(parseInt(yilan[0]) - 20)
        yilan.pop()
    }

    // bu blokta yukarı ya da aşağıya çarptı mı onu kontrol ettik
    if (yilan[0] >= 400 || yilan[0] < 0) {
        dur = true
        clearInterval(anaInterval)
        restart()
    }


    if (!dur) yilaniGoster()
}

function yemOlustur() {
    let rand = null
    do {
        rand = Math.floor(Math.random() * 226)
    } while (yilan.includes(rand));
    yem = rand
}

function yemKontrol() {
    if (yilan[0] == yem) {
        yilan.unshift(yem)
        yemOlustur()
        puan += 5
        puan_SPAN.innerHTML = puan
    }
}

function carpismaKontrol() {
    // sağ taraf
    if (yon == 'sağ') {
        for (let i = 19; i < 400; i += 20) {
            if (yilan[0] == i) {
                dur = true
                clearInterval(anaInterval)
                restart()
            }
        }
    }

    // sol taraf
    if (yon == 'sol') {
        for (let i = 0; i < 400; i += 20) {
            if (yilan[0] == i) {
                dur = true
                clearInterval(anaInterval)
                restart()
            }
        }
    }
}

function yilanKendiniMiYedi() {
    console.log(yilan);
    if (yon == 'sol') {
        if (yilan.includes(yilan[0] - 1)) {
            dur = true
            clearInterval(anaInterval)
            restart()
        }
    } else if (yon == 'sağ') {
        if (yilan.includes(yilan[0] + 1)) {
            dur = true
            clearInterval(anaInterval)
            restart()
        }
    } else if (yon == 'aşağı') {
        if (yilan.includes(yilan[0] + 20)) {
            dur = true
            clearInterval(anaInterval)
            restart()
        }
    } else if (yon == 'yukarı') {
        if (yilan.includes(yilan[0] - 20)) {
            dur = true
            clearInterval(anaInterval)
            restart()
        }
    }
}

function restart() {
    setTimeout(() => { location.reload() }, 1500)
}

// ---------------fonksiyonları çağır
kutucuklariYukle()
yemOlustur()
yilaniYarat()
yilaniGoster()

// ---------------event listeners
document.addEventListener('keydown', function(e) {
    switch (e.key) {
        case 'ArrowRight':
            if (yon != 'sol') {
                yon = 'sağ'
            }
            break
        case 'ArrowLeft':
            if (yon != 'sağ') {
                yon = 'sol'
            }
            break
        case 'ArrowDown':
            if (yon != 'yukarı') {
                yon = 'aşağı'
            }
            break
        case 'ArrowUp':
            if (yon != 'aşağı') {
                yon = 'yukarı'
            }
            break
    }
})

// ---------------interval çalıştır
anaInterval = setInterval(function() {
    carpismaKontrol()
    yilanKendiniMiYedi()
    yemKontrol()
    hareketEt() /*yılanı bastırma da bunun içinde*/
}, 80)