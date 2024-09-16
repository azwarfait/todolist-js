var input = document.getElementById("input");
var tambah = document.getElementById("tambah");
var list = document.getElementById("list");

tambah.addEventListener("click", tambahKeg);
input.addEventListener("keypress", tambahKeg);

function tambahKeg(event) {
  if (event.key == "Enter" || event.type == "click") {
    if (input.value == "") {
      alert("Data Kegiatan Tidak Boleh Kosong!");
      return;
    }
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", toggleSelesai);

    var kegiatan = document.createElement("span");
    kegiatan.innerHTML = input.value;

    var hapusBtn = document.createElement("button");
    hapusBtn.innerHTML = "Delete";
    hapusBtn.addEventListener("click", hapusKeg);

    var editBtn = document.createElement("button");
    editBtn.innerHTML = "Edit";
    editBtn.addEventListener("click", editKeg);

    var listItem = document.createElement("li");
    listItem.appendChild(checkbox);
    listItem.appendChild(kegiatan);
    listItem.appendChild(editBtn);
    listItem.appendChild(hapusBtn);

    list.appendChild(listItem);
    save();
  }
  return;
}

function hapusKeg(event) {
  btnHapus = event.target;
  li = btnHapus.parentElement;
  li.remove();
  save();
}

function editKeg(event) {
  var edited = prompt("Edit Data Kegiatan");
  if (/^\s*$/.test(edited) || edited == null) {
    alert("Data Kegiatan Tidak Boleh Kosong!");
    return;
  }
  var kegiatan = event.target;
  var teks = kegiatan.parentElement.querySelector("span");
  teks.textContent = edited;

  save();
}

function toggleSelesai(event) {
  var checkbox = event.target;
  var li = checkbox.parentElement;

  if (checkbox.checked) {
    li.querySelector("span").classList.add("selesai");
  } else {
    li.querySelector("span").classList.remove("selesai");
  }
  save();
}

function save() {
  var listKegiatan = [];
  var i = 0;

  while (i < list.querySelectorAll("li").length) {
    var kegiatan = {
      namaKeg: list.querySelectorAll("li")[i].querySelector("span").textContent,
      status: list.querySelectorAll("li")[i].querySelector("input").checked,
    };
    listKegiatan.push(kegiatan);
    i++;
  }
  localStorage.setItem("listKegiatan", JSON.stringify(listKegiatan));
}

function load() {
  listKegiatan = JSON.parse(localStorage.getItem("listKegiatan") || "[]");

  listKegiatan.forEach((kegiatan) => {
    li = document.createElement("li");
    li.innerHTML =
      "<input type='checkbox' ><span>" +
      kegiatan.namaKeg +
      "</span> <button>Edit</button> <button>Delete</button>";
    li.querySelector("input").addEventListener("change", toggleSelesai);
    li.querySelector("input").checked = kegiatan.status;
    if (li.querySelector("input").checked) {
      li.querySelector("span").classList.add("selesai");
    } else {
      li.querySelector("span").classList.remove("selesai");
    }
    list.appendChild(li);
  });

  for (i = 0; i < list.querySelectorAll("button").length; i++) {
    if (list.querySelectorAll("button")[i].innerHTML == "Delete") {
      list.querySelectorAll("button")[i].addEventListener("click", hapusKeg);
    } else if (list.querySelectorAll("button")[i].innerHTML == "Edit") {
      list.querySelectorAll("button")[i].addEventListener("click", editKeg);
    }
  }
}

window.onload = load();
