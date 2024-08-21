var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

var divisi = document.getElementById('divisi');
var namaDivisi = document.getElementById('namaDivisi');
var btnDivisi = document.getElementById('btnDivisi');

var objek = document.getElementById('objek');
var namaObjek = document.getElementById('namaObjek');
var btnObjek = document.getElementById('btnObjek');

var kelompokUtama = document.getElementById('kelompokUtama');
var namaKelompokUtama = document.getElementById('namaKelompokUtama');
var btnKelompokUtama = document.getElementById('btnKelompokUtama');

var kelompok = document.getElementById('kelompok');
var namaKelompok = document.getElementById('namaKelompok');
var btnKelompok = document.getElementById('btnKelompok');

var subKelompok = document.getElementById('subKelompok');
var namaSubKelompok = document.getElementById('namaSubKelompok');
var btnSubKelompok = document.getElementById('btnSubKelompok');

var kodePerkiraan = document.getElementById('kodePerkiraan');
var namaKodePerkiraan = document.getElementById('namaKodePerkiraan');
var btnKodePerkiraan = document.getElementById('btnKodePerkiraan');

var btnIsi = document.getElementById('btnIsi');
var btnKoreksi = document.getElementById('btnKoreksi');
var btnHapus = document.getElementById('btnHapus');
var btnProses = document.getElementById('btnProses');
var btnBatal = document.getElementById('btnBatal');

document.addEventListener('DOMContentLoaded', function () {

    function handleTableKeydown(e, tableId) {
        const table = $(`#${tableId}`).DataTable();
        const rows = $(`#${tableId} tbody tr`);
        const rowCount = rows.length;

        if (e.key === "Enter") {
            e.preventDefault();
            const selectedRow = table.row(".selected").data();
            if (selectedRow) {
                Swal.getConfirmButton().click();
            } else {
                const firstRow = $(`#${tableId} tbody tr:first-child`);
                if (firstRow.length) {
                    firstRow.click();
                    Swal.getConfirmButton().click();
                }
            }
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            if (currentIndex === null) {
                currentIndex = 0;
            } else {
                currentIndex = (currentIndex + 1) % rowCount;
            }
            rows.removeClass("selected");
            $(rows[currentIndex]).addClass("selected");
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (currentIndex === null) {
                currentIndex = rowCount - 1;
            } else {
                currentIndex = (currentIndex - 1 + rowCount) % rowCount;
            }
            rows.removeClass("selected");
            $(rows[currentIndex]).addClass("selected");
        } else if (e.key === "ArrowRight") {
            e.preventDefault();
            currentIndex = null;
            const pageInfo = table.page.info();
            if (pageInfo.page < pageInfo.pages - 1) {
                table.page('next').draw('page');
            }
        } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            currentIndex = null;
            const pageInfo = table.page.info();
            if (pageInfo.page > 0) {
                table.page('previous').draw('page');
            }
        }
    }

    function decodeHtmlEntities(str) {
        let textarea = document.createElement('textarea');
        textarea.innerHTML = str;
        return textarea.value;
    }

    //#region button divisi
    btnDivisi.addEventListener("click", function (e) {
        try {
            Swal.fire({
                title: "Pilih Divisi",
                html: `<table id="table_divisi" class="display" style="width:100%">
                        <thead>
                            <tr>
                                <th>Id Divisi</th>
                                <th>Nama Divisi</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>`,
                showCancelButton: true,
                confirmButtonText: 'Pilih',
                cancelButtonText: 'Close',
                returnFocus: false,
                preConfirm: () => {
                    const table = $("#table_divisi").DataTable();
                    const selectedData = table.row(".selected").data();
                    if (!selectedData) {
                        Swal.showValidationMessage("Please select a row");
                        return false;
                    }
                    return selectedData;
                },
                didOpen: () => {
                    $(document).ready(function () {
                        const table = $("#table_divisi").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            order: [[1, "asc"]],
                            ajax: {
                                url: "MaintenanceObjek/getUserDivisi",
                                dataType: "json",
                                type: "GET",
                                error: function (xhr, error, thrown) {
                                    console.error("Error fetching data: ", thrown);
                                },
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [
                                {
                                    data: "IdDivisi",
                                },
                                {
                                    data: "NamaDivisi",
                                }
                            ]
                        });

                        $("#table_divisi tbody").on("click", "tr", function () {
                            table.$("tr.selected").removeClass("selected");
                            $(this).addClass("selected");
                        });

                        currentIndex = null;
                        Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_divisi'));

                    });
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    const selectedRow = result.value;
                    namaDivisi.value = selectedRow.NamaDivisi ? decodeHtmlEntities(selectedRow.NamaDivisi.trim()) : '';
                    divisi.value = selectedRow.IdDivisi ? decodeHtmlEntities(selectedRow.IdDivisi.trim()) : '';
                    btnObjek.focus();
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });
    //#endregion

    //#region Button Objek
    btnObjek.addEventListener("click", function (e) {
        try {
            Swal.fire({
                title: "Pilih Objek",
                html: `<table id="table_Objek" class="display" style="width:100%">
                            <thead>
                                <tr>
                                    <th>Id Objek</th>
                                    <th>Nama Objek</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>`,
                showCancelButton: true,
                confirmButtonText: 'Pilih',
                returnFocus: false,
                cancelButtonText: 'Close',
                preConfirm: () => {
                    const table = $("#table_Objek").DataTable();
                    const selectedData = table.row(".selected").data();
                    if (!selectedData) {
                        Swal.showValidationMessage("Please select a row");
                        return false;
                    }
                    return selectedData;
                },
                didOpen: () => {
                    $(document).ready(function () {
                        const table = $("#table_Objek").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            order: [[1, "asc"]],
                            ajax: {
                                url: "MaintenanceObjek/getObjek",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    idDivisi: divisi.value
                                },
                                error: function (xhr, error, thrown) {
                                    console.error("Error fetching data: ", thrown);
                                }
                            },
                            columns: [
                                {
                                    data: "IdObjek",
                                },
                                {
                                    data: "NamaObjek",
                                }
                            ]
                        });

                        $("#table_Objek tbody").on("click", "tr", function () {
                            table.$("tr.selected").removeClass("selected");
                            $(this).addClass("selected");
                        });

                        currentIndex = null;
                        Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_Objek'));

                    });
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    const selectedRow = result.value;
                    namaObjek.value = selectedRow.NamaObjek ? decodeHtmlEntities(selectedRow.NamaObjek.trim()) : '';
                    objek.value = selectedRow.IdObjek ? decodeHtmlEntities(selectedRow.IdObjek.trim()) : '';

                    btnKelompokUtama.focus();
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });
    //#endregion

    //#region Button Kelompok Utama
    btnKelompokUtama.addEventListener("click", function (e) {
        try {
            Swal.fire({
                title: "Pilih Kelompok Utama",
                html: `<table id="table_kelUtama" class="display" style="width:100%">
                            <thead>
                                <tr>
                                    <th>Id Kelompok Utama</th>
                                    <th>Nama Kelompok Utama</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>`,
                showCancelButton: true,
                confirmButtonText: 'Pilih',
                returnFocus: false,
                cancelButtonText: 'Close',
                preConfirm: () => {
                    const table = $("#table_kelUtama").DataTable();
                    const selectedData = table.row(".selected").data();
                    if (!selectedData) {
                        Swal.showValidationMessage("Please select a row");
                        return false;
                    }
                    return selectedData;
                },
                didOpen: () => {
                    $(document).ready(function () {
                        const table = $("#table_kelUtama").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            order: [[1, "asc"]],
                            ajax: {
                                url: "MaintenanceObjek/getKelUtama",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    idObjek: objek.value
                                },
                                error: function (xhr, error, thrown) {
                                    console.error("Error fetching data: ", thrown);
                                }
                            },
                            columns: [
                                {
                                    data: "IdKelompokUtama",
                                },
                                {
                                    data: "NamaKelompokUtama",
                                }
                            ]
                        });

                        $("#table_kelUtama tbody").on("click", "tr", function () {
                            table.$("tr.selected").removeClass("selected");
                            $(this).addClass("selected");
                        });

                        currentIndex = null;
                        Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_kelUtama'));

                    });
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    const selectedRow = result.value;
                    namaKelompokUtama.value = selectedRow.NamaKelompokUtama ? decodeHtmlEntities(selectedRow.NamaKelompokUtama.trim()) : '';
                    kelompokUtama.value = selectedRow.IdKelompokUtama ? decodeHtmlEntities(selectedRow.IdKelompokUtama.trim()) : '';

                    btnKelompok.focus();
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });
    //#endregion

    //#region Button Kelompok
    btnKelompok.addEventListener("click", function (e) {
        try {
            Swal.fire({
                title: "Pilih Kelompok",
                html: `<table id="table_kel" class="display" style="width:100%">
                            <thead>
                                <tr>
                                    <th>Id Kelompok</th>
                                    <th>Nama Kelompok</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>`,
                showCancelButton: true,
                confirmButtonText: 'Pilih',
                returnFocus: false,
                cancelButtonText: 'Close',
                preConfirm: () => {
                    const table = $("#table_kel").DataTable();
                    const selectedData = table.row(".selected").data();
                    if (!selectedData) {
                        Swal.showValidationMessage("Please select a row");
                        return false;
                    }
                    return selectedData;
                },
                didOpen: () => {
                    $(document).ready(function () {
                        const table = $("#table_kel").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            order: [[1, "asc"]],
                            ajax: {
                                url: "MaintenanceObjek/getKel",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    idKelUtama: kelompokUtama.value
                                },
                                error: function (xhr, error, thrown) {
                                    console.error("Error fetching data: ", thrown);
                                }
                            },
                            columns: [
                                {
                                    data: "idkelompok",
                                },
                                {
                                    data: "namakelompok",
                                }
                            ]
                        });

                        $("#table_kel tbody").on("click", "tr", function () {
                            table.$("tr.selected").removeClass("selected");
                            $(this).addClass("selected");
                        });

                        currentIndex = null;
                        Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_kel'));

                    });
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    const selectedRow = result.value;
                    namaKelompok.value = selectedRow.namakelompok ? decodeHtmlEntities(selectedRow.namakelompok.trim()) : '';
                    kelompok.value = selectedRow.idkelompok ? decodeHtmlEntities(selectedRow.idkelompok.trim()) : '';

                    btnSubKelompok.focus();
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });
    //#endregion

    //#region Button Kelompok
    btnSubKelompok.addEventListener("click", function (e) {
        try {
            Swal.fire({
                title: "Pilih Sub Kelompok",
                html: `<table id="table_subKel" class="display" style="width:100%">
                            <thead>
                                <tr>
                                    <th>Id Sub Kelompok</th>
                                    <th>Nama Sub Kelompok</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>`,
                showCancelButton: true,
                confirmButtonText: 'Pilih',
                returnFocus: false,
                cancelButtonText: 'Close',
                preConfirm: () => {
                    const table = $("#table_subKel").DataTable();
                    const selectedData = table.row(".selected").data();
                    if (!selectedData) {
                        Swal.showValidationMessage("Please select a row");
                        return false;
                    }
                    return selectedData;
                },
                didOpen: () => {
                    $(document).ready(function () {
                        const table = $("#table_subKel").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            order: [[1, "asc"]],
                            ajax: {
                                url: "MaintenanceObjek/getSubKel",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    idKel: kelompok.value
                                },
                                error: function (xhr, error, thrown) {
                                    console.error("Error fetching data: ", thrown);
                                }
                            },
                            columns: [
                                {
                                    data: "IdSubkelompok",
                                },
                                {
                                    data: "NamaSubKelompok",
                                }
                            ]
                        });

                        $("#table_subKel tbody").on("click", "tr", function () {
                            table.$("tr.selected").removeClass("selected");
                            $(this).addClass("selected");
                        });

                        currentIndex = null;
                        Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_subKel'));

                    });
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    const selectedRow = result.value;
                    namaSubKelompok.value = selectedRow.NamaSubKelompok ? decodeHtmlEntities(selectedRow.NamaSubKelompok.trim()) : '';
                    subKelompok.value = selectedRow.IdSubkelompok ? decodeHtmlEntities(selectedRow.IdSubkelompok.trim()) : '';

                    $.ajax({
                        url: "MaintenanceObjek/getIdPerkiraan",
                        dataType: "json",
                        type: "GET",
                        data: {
                            _token: csrfToken,
                            idSubKel: subKelompok.value
                        },
                        success: function (result) {
                            let selectedRow = result.data;
                            kodePerkiraan.value = selectedRow[0].KodePerkiraan_Subkelompok ?? "";

                            $.ajax({
                                url: "MaintenanceObjek/getNoKodePerkiraan",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    idPerkiraan: kodePerkiraan.value
                                },
                                success: function (result) {
                                    let selectedRow = result.data;
                                    namaKodePerkiraan.value = selectedRow[0].Keterangan ?? "";
                                },
                                error: function (xhr, error, thrown) {
                                    console.error("Error fetching data: ", thrown);
                                }
                            });

                        },
                        error: function (xhr, error, thrown) {
                            console.error("Error fetching data: ", thrown);
                        }
                    });

                    btnKodePerkiraan.focus();
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });
    //#endregion

    //#region Perkiraan
    btnKodePerkiraan.addEventListener("click", function (e) {
        try {
            Swal.fire({
                title: "Pilih Kode Perkiraan",
                html: `<table id="table_Perkiraan" class="display" style="width:100%">
                            <thead>
                                <tr>
                                    <th>Id Kode Perkiraan</th>
                                    <th>Nama Kode Perkiraan</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>`,
                showCancelButton: true,
                confirmButtonText: 'Pilih',
                returnFocus: false,
                cancelButtonText: 'Close',
                preConfirm: () => {
                    const table = $("#table_Perkiraan").DataTable();
                    const selectedData = table.row(".selected").data();
                    if (!selectedData) {
                        Swal.showValidationMessage("Please select a row");
                        return false;
                    }
                    return selectedData;
                },
                didOpen: () => {
                    $(document).ready(function () {
                        const table = $("#table_Perkiraan").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            order: [[1, "asc"]],
                            ajax: {
                                url: "MaintenanceObjek/getPerkiraan",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                                error: function (xhr, error, thrown) {
                                    console.error("Error fetching data: ", thrown);
                                }
                            },
                            columns: [
                                {
                                    data: "NoKodePerkiraan",
                                },
                                {
                                    data: "Keterangan",
                                }
                            ]
                        });

                        $("#table_Perkiraan tbody").on("click", "tr", function () {
                            table.$("tr.selected").removeClass("selected");
                            $(this).addClass("selected");
                        });

                        currentIndex = null;
                        Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_Perkiraan'));

                    });
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    const selectedRow = result.value;
                    kodePerkiraan.value = selectedRow.NoKodePerkiraan ? decodeHtmlEntities(selectedRow.NoKodePerkiraan.trim()) : '';
                    namaKodePerkiraan.value = selectedRow.Keterangan ? decodeHtmlEntities(selectedRow.Keterangan.trim()) : '';

                    btnProses.focus();
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });
    //#endregion

    function enableInputs() {
        btnDivisi.disabled = false;
        btnSubKelompok.disabled = false;
        btnObjek.disabled = false;
        btnKelompok.disabled = false;
        btnKodePerkiraan.disabled = false;
        btnKelompokUtama.disabled = false;
        btnProses.disabled = false;
        btnBatal.disabled = false;

        namaDivisi.removeAttribute('readonly');
        namaSubKelompok.removeAttribute('readonly');
        namaKelompok.removeAttribute('readonly');
        namaObjek.removeAttribute('readonly');
        namaKelompokUtama.removeAttribute('readonly');
        namaKodePerkiraan.removeAttribute('readonly');

        btnIsi.disabled = true;
        btnKoreksi.disabled = true;
        btnHapus.disabled = true;
    }

    function disableInputs() {
        btnDivisi.disabled = true;
        btnSubKelompok.disabled = true;
        btnObjek.disabled = true;
        btnKelompok.disabled = true;
        btnKodePerkiraan.disabled = true;
        btnKelompokUtama.disabled = true;
        btnProses.disabled = true;
        btnBatal.disabled = true;

        namaDivisi.setAttribute('readonly', true);
        namaSubKelompok.setAttribute('readonly', true);
        namaKelompok.setAttribute('readonly', true);
        namaObjek.setAttribute('readonly', true);
        namaKelompokUtama.setAttribute('readonly', true);
        namaKodePerkiraan.setAttribute('readonly', true);

        btnIsi.disabled = false;
        btnKoreksi.disabled = false;
        btnHapus.disabled = false;
    }

    function clearInput() {
        divisi.value = '';
        namaDivisi.value = '';
        objek.value = '';
        namaObjek.value = '';
        kelompokUtama.value = '';
        namaKelompokUtama.value = '';
        kelompok.value = '';
        namaKelompok.value = '';
        subKelompok.value = '';
        namaSubKelompok.value = '';
        kodePerkiraan.value = '';
        namaKodePerkiraan.value = '';
    }

    //#region button isi
    btnIsi.addEventListener('click', async () => {
        nomorButton = 1;
        enableInputs();
        btnDivisi.focus();
    });
    //#endregion

    //#region button koreksi
    btnKoreksi.addEventListener('click', async () => {
        nomorButton = 2;
        enableInputs();
        btnDivisi.focus();
    });
    //#endregion

    //#region button Hapus
    btnHapus.addEventListener('click', async () => {
        nomorButton = 3;
        enableInputs();
        btnDivisi.focus();
    });
    //#endregion

    //#region button Batal
    btnBatal.addEventListener('click', async () => {
        nomorButton = 0;
        disableInputs();
        clearInput();
        btnIsi.focus();
    });
    //#endregion


    //#region proses button
    btnProses.addEventListener('click', async () => {
        if (!divisi.value) {
            Swal.fire({
                icon: 'error',
                title: 'Divisi Kosong!',
                text: 'Data Tidak Dapat Di Proses!!...',
            });
            return;
        }

        //#region ISI
        if (nomorButton == 1) {
            if (namaObjek.value && namaKelompokUtama.value && namaKelompok.value && namaSubKelompok.value && namaKodePerkiraan.value) {
                $.ajax({
                    type: 'GET',
                    url: 'MaintenanceObjek/cekPerkiraan',
                    data: {
                        _token: csrfToken,
                        xketerangan: namaKodePerkiraan.value
                    },
                    success: function (result) {
                        if (!result[0]) {
                            Swal.fire({
                                icon: 'error',
                                title: 'Nama Perkiraan Tidak Ada!',
                                text: 'Data Tidak Dapat Di Proses!!...',
                            });
                            return;
                        }

                        else {
                            //#region ISI objek
                            if (objek.value === '') {
                                $.ajax({
                                    type: 'GET',
                                    url: 'MaintenanceObjek/cekObjek',
                                    data: {
                                        _token: csrfToken,
                                        IdDivisi: divisi.value,
                                        objek: namaObjek.value
                                    },
                                    success: function (result) {
                                        if (parseInt(result[0].ada) !== 0) {
                                            Swal.fire({
                                                icon: 'error',
                                                title: 'Objek Sudah Ada!',
                                                text: 'Data Tidak Dapat Di Proses!!...',
                                            });
                                            return;
                                        }
                                        else {
                                            $.ajax({
                                                type: 'GET',
                                                url: 'MaintenanceObjek/ambilCounter',
                                                data: {
                                                    _token: csrfToken,
                                                },
                                                success: function (result) {
                                                    objek.value = result[0].IdObjek;

                                                    $.ajax({
                                                        type: 'GET',
                                                        url: 'MaintenanceObjek/updateObjekCounter',
                                                        data: {
                                                            _token: csrfToken,
                                                            XIdObjek: objek.value
                                                        },
                                                        success: function (result) {
                                                        },
                                                        error: function (xhr, status, error) {
                                                            console.error(error);
                                                        },
                                                        complete: function () {
                                                            setTimeout(() => {
                                                                canClickProsesButton = true;
                                                            }, 3000);
                                                        }
                                                    });

                                                    $.ajax({
                                                        type: 'GET',
                                                        url: 'MaintenanceObjek/insertObjek',
                                                        data: {
                                                            _token: csrfToken,
                                                            XIdObjek: objek.value,
                                                            XNamaObjek: namaObjek.value,
                                                            XIdDivisi_Objek: divisi.value
                                                        },
                                                        success: function (result) {
                                                        },
                                                        error: function (xhr, status, error) {
                                                            console.error(error);
                                                        },
                                                        complete: function () {
                                                            setTimeout(() => {
                                                                canClickProsesButton = true;
                                                            }, 3000);
                                                        }
                                                    });
                                                },
                                                error: function (xhr, status, error) {
                                                    console.error(error);
                                                },
                                                complete: function () {
                                                    setTimeout(() => {
                                                        canClickProsesButton = true;
                                                    }, 3000);
                                                }
                                            });
                                        }
                                    },
                                    error: function (xhr, status, error) {
                                        console.error(error);
                                    },
                                    complete: function () {
                                        setTimeout(() => {
                                            canClickProsesButton = true;
                                        }, 3000);
                                    }
                                });
                            }

                            //#region ISI kel utama 
                            if (kelompokUtama.value === '') {
                                $.ajax({
                                    type: 'GET',
                                    url: 'MaintenanceObjek/cekKelUtama',
                                    data: {
                                        _token: csrfToken,
                                        IdObjek: objek.value,
                                        kelut: namaKelompokUtama.value
                                    },
                                    success: function (result) {
                                        if (parseInt(result[0].ada) !== 0) {
                                            Swal.fire({
                                                icon: 'error',
                                                title: 'Kelompok Utama Sudah Ada!',
                                                text: 'Data Tidak Dapat Di Proses!!...',
                                            });
                                            return;
                                        }
                                        else {
                                            $.ajax({
                                                type: 'GET',
                                                url: 'MaintenanceObjek/ambilCounter',
                                                data: {
                                                    _token: csrfToken,
                                                },
                                                success: function (result) {
                                                    kelompokUtama.value = result[0].IdKelUtama;

                                                    $.ajax({
                                                        type: 'GET',
                                                        url: 'MaintenanceObjek/updateKelUtamaCounter',
                                                        data: {
                                                            _token: csrfToken,
                                                            XIdKelompokUtama: kelompokUtama.value
                                                        },
                                                        success: function (result) {
                                                        },
                                                        error: function (xhr, status, error) {
                                                            console.error(error);
                                                        },
                                                        complete: function () {
                                                            setTimeout(() => {
                                                                canClickProsesButton = true;
                                                            }, 3000);
                                                        }
                                                    });

                                                    $.ajax({
                                                        type: 'GET',
                                                        url: 'MaintenanceObjek/insertKelUtama',
                                                        data: {
                                                            _token: csrfToken,
                                                            XIdKelompokUtama: kelompokUtama.value,
                                                            XNamaKelompokUtama: namaKelompokUtama.value,
                                                            XIdObjek_KelompokUtama: objek.value
                                                        },
                                                        success: function (result) {
                                                        },
                                                        error: function (xhr, status, error) {
                                                            console.error(error);
                                                        },
                                                        complete: function () {
                                                            setTimeout(() => {
                                                                canClickProsesButton = true;
                                                            }, 3000);
                                                        }
                                                    });
                                                },
                                                error: function (xhr, status, error) {
                                                    console.error(error);
                                                },
                                                complete: function () {
                                                    setTimeout(() => {
                                                        canClickProsesButton = true;
                                                    }, 3000);
                                                }
                                            });
                                        }
                                    },
                                    error: function (xhr, status, error) {
                                        console.error(error);
                                    },
                                    complete: function () {
                                        setTimeout(() => {
                                            canClickProsesButton = true;
                                        }, 3000);
                                    }
                                });
                            }

                            //#region ISI kelompok 
                            if (kelompok.value === '') {
                                $.ajax({
                                    type: 'GET',
                                    url: 'MaintenanceObjek/cekKel',
                                    data: {
                                        _token: csrfToken,
                                        IdKelut: kelompokUtama.value,
                                        kelompok: namaKelompok.value
                                    },
                                    success: function (result) {
                                        if (parseInt(result[0].ada) !== 0) {
                                            Swal.fire({
                                                icon: 'error',
                                                title: 'Kelompok Sudah Ada!',
                                                text: 'Data Tidak Dapat Di Proses!!...',
                                            });
                                            return;
                                        }
                                        else {
                                            $.ajax({
                                                type: 'GET',
                                                url: 'MaintenanceObjek/ambilCounter',
                                                data: {
                                                    _token: csrfToken,
                                                },
                                                success: function (result) {
                                                    kelompok.value = result[0].IdKelompok;

                                                    $.ajax({
                                                        type: 'GET',
                                                        url: 'MaintenanceObjek/updateKelCounter',
                                                        data: {
                                                            _token: csrfToken,
                                                            XIdKelompok: kelompok.value
                                                        },
                                                        success: function (result) {
                                                        },
                                                        error: function (xhr, status, error) {
                                                            console.error(error);
                                                        },
                                                        complete: function () {
                                                            setTimeout(() => {
                                                                canClickProsesButton = true;
                                                            }, 3000);
                                                        }
                                                    });

                                                    $.ajax({
                                                        type: 'GET',
                                                        url: 'MaintenanceObjek/insertKel',
                                                        data: {
                                                            _token: csrfToken,
                                                            XIdKelompok: kelompok.value,
                                                            XNamaKelompok: namaKelompok.value,
                                                            XIdKelompokUtama_Kelompok: kelompokUtama.value
                                                        },
                                                        success: function (result) {
                                                        },
                                                        error: function (xhr, status, error) {
                                                            console.error(error);
                                                        },
                                                        complete: function () {
                                                            setTimeout(() => {
                                                                canClickProsesButton = true;
                                                            }, 3000);
                                                        }
                                                    });
                                                },
                                                error: function (xhr, status, error) {
                                                    console.error(error);
                                                },
                                                complete: function () {
                                                    setTimeout(() => {
                                                        canClickProsesButton = true;
                                                    }, 3000);
                                                }
                                            });
                                        }
                                    },
                                    error: function (xhr, status, error) {
                                        console.error(error);
                                    },
                                    complete: function () {
                                        setTimeout(() => {
                                            canClickProsesButton = true;
                                        }, 3000);
                                    }
                                });
                            }

                            //#region ISI Sub kelompok 
                            if (subKelompok.value === '') {
                                $.ajax({
                                    type: 'GET',
                                    url: 'MaintenanceObjek/cekSubKel',
                                    data: {
                                        _token: csrfToken,
                                        IdKelp: kelompok.value,
                                        subkel: namaSubKelompok.value
                                    },
                                    success: function (result) {
                                        if (parseInt(result[0].ada) !== 0) {
                                            Swal.fire({
                                                icon: 'error',
                                                title: 'Sub Kelompok Sudah Ada!',
                                                text: 'Data Tidak Dapat Di Proses!!...',
                                            });
                                            return;
                                        }
                                        else {
                                            $.ajax({
                                                type: 'GET',
                                                url: 'MaintenanceObjek/ambilCounter',
                                                data: {
                                                    _token: csrfToken,
                                                },
                                                success: function (result) {
                                                    subKelompok.value = result[0].IdSubKelompok;

                                                    $.ajax({
                                                        type: 'GET',
                                                        url: 'MaintenanceObjek/updateSubKelCounter',
                                                        data: {
                                                            _token: csrfToken,
                                                            XIdSubKelompok: subKelompok.value
                                                        },
                                                        success: function (result) {
                                                        },
                                                        error: function (xhr, status, error) {
                                                            console.error(error);
                                                        },
                                                        complete: function () {
                                                            setTimeout(() => {
                                                                canClickProsesButton = true;
                                                            }, 3000);
                                                        }
                                                    });

                                                    $.ajax({
                                                        type: 'GET',
                                                        url: 'MaintenanceObjek/insertSubKel',
                                                        data: {
                                                            _token: csrfToken,
                                                            XIdSubKelompok: subKelompok.value,
                                                            XNamaSubKelompok: namaSubKelompok.value,
                                                            XIdKelompokUtama_Kelompok: kelompok.value,
                                                            XKodePerkiraan: kodePerkiraan.value
                                                        },
                                                        success: function (result) {
                                                        },
                                                        error: function (xhr, status, error) {
                                                            console.error(error);
                                                        },
                                                        complete: function () {
                                                            setTimeout(() => {
                                                                canClickProsesButton = true;
                                                            }, 3000);
                                                        }
                                                    });
                                                },
                                                error: function (xhr, status, error) {
                                                    console.error(error);
                                                },
                                                complete: function () {
                                                    setTimeout(() => {
                                                        canClickProsesButton = true;
                                                    }, 3000);
                                                }
                                            });
                                        }
                                    },
                                    error: function (xhr, status, error) {
                                        console.error(error);
                                    },
                                    complete: function () {
                                        setTimeout(() => {
                                            canClickProsesButton = true;
                                        }, 3000);
                                    }
                                });
                            }


                        }
                    },
                    error: function (xhr, status, error) {
                        console.error(error);
                    },
                    complete: function () {
                        setTimeout(() => {
                            canClickProsesButton = true;
                        }, 3000);
                    }
                });
            }
        }

    });
    //#endregion

});