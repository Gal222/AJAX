// =====================
// AJAX Players (muy simplificado)
// =====================

// Elementos del DOM
var tbody = document.getElementById("tbody");
var filterInput = document.getElementById("filter");
var detail = document.getElementById("detailContent");
var count = document.getElementById("count");

// Datos
var allPlayers = [];
var filteredPlayers = [];
var selectedId = null;

// ---------------- Render tabla ----------------
function renderTable() {

  if (filteredPlayers.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5">No hay resultados</td></tr>';
    return;
  }

  var html = "";

  for (var i = 0; i < filteredPlayers.length; i++) {

    var p = filteredPlayers[i];
    var selectedClass = (p.id === selectedId) ? "selected" : "";

    var c = p.coordenadas;
    var pos = "x=" + c.x + ", y=" + c.y + ", z=" + c.z;

    html +=
      '<tr class="' + selectedClass + '" data-id="' + p.id + '">' +
      '<td>' + p.name + '</td>' +
      '<td>' + p.gamemode + '</td>' +
      '<td>' + p.rango + '</td>' +
      '<td>' + p.mundo + '</td>' +
      '<td>' + pos + '</td>' +
      '</tr>';
  }

  tbody.innerHTML = html;
}

// ---------------- Render detalle ----------------
function renderDetail(player) {

  if (!player) {
    detail.textContent = "Selecciona un jugador";
    return;
  }

  var c = player.coordenadas;
  var posActual = "x=" + c.x + ", y=" + c.y + ", z=" + c.z;

  var r = player.respawn;
  var respawnText = r.mundo + " | x=" + r.x + ", y=" + r.y + ", z=" + r.z;

  var d = player.ultimaMuerte;
  var lastDeathText = d.mundo + " | x=" + d.x + ", y=" + d.y + ", z=" + d.z + " | causa=" + d.causa + " | fecha=" + d.fecha;

  detail.innerHTML =
    '<div class="kvs">' +

    '<div class="key">Jugador</div><div class="val">' + player.name + '</div>' +
    '<div class="key">Modo de Juego</div><div class="val">' + player.gamemode + '</div>' +
    '<div class="key">Rango</div><div class="val">' + player.rango + '</div>' +
    '<div class="key">Mundo</div><div class="val">' + player.mundo + '</div>' +

    '<div class="key">Vida</div><div class="val">(' + player.vida + '/20)</div>' +
    '<div class="key">Comida</div><div class="val">(' + player.comida + '/20)</div>' +

    '<div class="key">Coordenadas actuales</div><div class="val">' + posActual + '</div>' +
    '<div class="key">Reaparición</div><div class="val">' + respawnText + '</div>' +
    '<div class="key">Última muerte</div><div class="val">' + lastDeathText + '</div>' +

    '</div>';
}

// ---------------- Filtro ----------------
function applyFilter() {

  var q = filterInput.value.toLowerCase();

  filteredPlayers = [];

  for (var i = 0; i < allPlayers.length; i++) {

    var p = allPlayers[i];

    var busqueda =
      p.name + " " +
      p.gamemode + " " +
      p.rango + " " +
      p.mundo + " " +
      p.coordenadas.x + " " +
      p.coordenadas.y + " " +
      p.coordenadas.z;

    if (busqueda.toLowerCase().includes(q)) {
      filteredPlayers.push(p);
    }
  }

  renderTable();
  count.textContent = filteredPlayers.length + " / " + allPlayers.length;
}

// ---------------- Selección ----------------
function selectPlayerById(id) {

  selectedId = id;

  for (var i = 0; i < allPlayers.length; i++) {
    if (allPlayers[i].id === id) {
      renderDetail(allPlayers[i]);
      break;
    }
  }

  renderTable();
}

// ---------------- Carga JSON ----------------
fetch("./players.json")
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {

    allPlayers = data;
    filteredPlayers = data;

    if (allPlayers.length > 0) {
      selectedId = allPlayers[0].id;
      renderDetail(allPlayers[0]);
    }

    renderTable();
    count.textContent = filteredPlayers.length + " / " + allPlayers.length;
  });

//Detalles
filterInput.addEventListener("input", applyFilter);

tbody.addEventListener("click", function (e) {

  var tr = e.target.closest("tr");
  if (!tr) return;

  var id = Number(tr.getAttribute("data-id"));
  selectPlayerById(id);
});