@extends('layouts.appQC')
@section('content')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                @if (Session::has('success'))
                    <div class="alert alert-success">
                        {{ Session::get('success') }}
                    </div>
                @elseif (Session::has('error'))
                    <div class="alert alert-danger">
                        {{ Session::get('error') }}
                    </div>
                @endif
                <div class="card">
                    <div class="card-header">Extruder Tropodo</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">

                        <div class="container">

                            <!-- Row 1: Jam Input, Nomor Transaksi, and Button Nomor Transaksi -->
                            <div class="row">
                                <div class="col-sm-2">
                                    <label for="jamInput" class="col-form-label">Jam Input</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="time" class="form-control" id="jamInput">
                                </div>
                                <div class="col-sm-2">
                                    <label for="nomorTransaksi" class="col-form-label">No. Transaksi</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" id="nomorTransaksi" class="form-control">
                                </div>
                                <div class="col-sm-2">
                                    <button type="button" class="btn btn-primary" id="buttonNomorTransaksi">No.
                                        Transaksi</button>
                                </div>
                            </div>

                            <!-- Row 2: Tanggal -->
                            <div class="row">
                                <div class="col-sm-2">
                                    <label for="tanggal" class="col-form-label">Tanggal</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="date" class="form-control" id="tanggal">
                                </div>
                            </div>

                            <!-- Row 3: Shift Letter, Shift Awal, Shift Akhir -->
                            <div class="row">
                                <div class="col-sm-2">
                                    <label for="shiftLetter" class="col-form-label">Shift</label>
                                </div>
                                <div class="col-sm-1">
                                    <input type="text" class="form-control" id="shiftLetter" maxlength="1">
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" class="form-control" id="shiftAwal" disabled>
                                </div>
                                <label class="col-form-label">S/D</label>
                                <div class="col-sm-2">
                                    <input type="text" class="form-control" id="shiftAkhir" disabled>
                                </div>
                            </div>

                            <!-- Row 4: Mesin, Nama Mesin, and Button Cari Mesin -->
                            <div class="row">
                                <div class="col-sm-2">
                                    <label for="mesin" class="col-form-label">Mesin</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" class="form-control" id="mesin" disabled>
                                </div>
                                <div class="col-sm-2">
                                    <label for="namaMesin" class="col-form-label">Nama Mesin</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" class="form-control" id="namaMesin" disabled>
                                </div>
                                <div class="col-sm-2">
                                    <button type="button" class="btn btn-primary" id="buttonIdMesin">Cari Mesin</button>
                                </div>
                            </div>

                            <!-- Row 5: Spek Benang, Id Konversi Ext, and Button Spek Benang -->
                            <div class="row">
                                <div class="col-sm-2">
                                    <label for="spekBenang" class="col-form-label">Spek Benang</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" class="form-control" id="spekBenang" disabled>
                                </div>
                                <div class="col-sm-2">
                                    <label for="idKonversi" class="col-form-label">Id Konversi Ext</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" class="form-control" id="idKonversi">
                                </div>
                                <div class="col-sm-2">
                                    <button type="button" class="btn btn-primary" id="buttonSpekBenang">Spek
                                        Benang</button>
                                </div>
                            </div>

                            <!-- Row 6: Keterangan and Denier Rata-Rata -->
                            <div class="row">
                                <div class="col-sm-2">
                                    <label for="keterangan" class="col-form-label">Keterangan</label>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" class="form-control" id="keterangan">
                                </div>
                                <div class="col-sm-2">
                                    <label for="denier" class="col-form-label">Denier Rata-Rata</label>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" class="form-control" id="denier">
                                </div>
                            </div>

                        </div>


                        {{-- ----------------------- --}}
                        {{-- quantity dan prosentase --}}
                        <div class="container mt-3">
                            <div class="row">
                                <div class="col-sm-10">
                                </div>
                                <div class="col-sm-1">
                                    Quantity
                                </div>
                                <div class="col-sm-1">
                                    Prosen
                                </div>
                            </div>

                            {{-- Bahan Baku --}}
                            <div class="row">
                                <div class="col-sm-2">
                                    <label>Bahan Baku</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" id="bahan" name="bahan" class="form-control mb-1"
                                        disabled>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" id="typeBahan" name="typeBahan" class="form-control mb-1"
                                        disabled>
                                </div>
                                <div class="col-sm-2">
                                    <button type="button" class="btn btn-primary form-control mb-1"
                                        id="buttonBahanBaku">Bahan Baku</button>
                                </div>
                                <div class="col-sm-1">
                                    <input type="text" id="quantityBahanBaku" name="quantityBahanBaku"
                                        class="form-control mb-1" disabled>
                                </div>
                                <div class="col-sm-1">
                                    <input type="text" id="prosentaseBahanBaku" name="prosentaseBahanBaku"
                                        class="form-control mb-1" disabled>
                                </div>
                            </div>

                            <!-- Calpet/CACO3 -->
                            <div class="row">
                                <div class="col-sm-2">
                                    <label>Calpet/CACO3</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" id="calpetCaco3" name="calpetCaco3" class="form-control mb-1"
                                        disabled>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" id="typeCalpetCaco3" name="typeCalpetCaco3"
                                        class="form-control mb-1" disabled>
                                </div>
                                <div class="col-sm-2">
                                    <button type="button" class="btn btn-primary form-control mb-1"
                                        id="buttonCalpetCaco3">Calpet/CACO3</button>
                                </div>
                                <div class="col-sm-1">
                                    <input type="text" id="quantityCalpetCaco3" name="quantityCalpetCaco3"
                                        class="form-control mb-1" disabled>
                                </div>
                                <div class="col-sm-1">
                                    <input type="text" id="prosentaseCalpetCaco3" name="prosentaseCalpetCaco3"
                                        class="form-control mb-1" disabled>
                                </div>
                            </div>

                            <!-- MasterBath -->
                            <div class="row">
                                <div class="col-sm-2">
                                    <label>MasterBath</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" id="masterBath" name="masterBath" class="form-control mb-1"
                                        disabled>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" id="typeMasterBath" name="typeMasterBath"
                                        class="form-control mb-1" disabled>
                                </div>
                                <div class="col-sm-2">
                                    <button type="button" class="btn btn-primary form-control mb-1"
                                        id="buttonMasterBath">MasterBath</button>
                                </div>
                                <div class="col-sm-1">
                                    <input type="text" id="quantityMasterBath" name="quantityMasterBath"
                                        class="form-control mb-1" disabled>
                                </div>
                                <div class="col-sm-1">
                                    <input type="text" id="prosentaseMasterBath" name="prosentaseMasterBath"
                                        class="form-control mb-1" disabled>
                                </div>
                            </div>

                            <!-- U V -->
                            <div class="row">
                                <div class="col-sm-2">
                                    <label>U V</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" id="uv" name="uv" class="form-control mb-1"
                                        disabled>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" id="typeUv" name="typeUv" class="form-control mb-1"
                                        disabled>
                                </div>
                                <div class="col-sm-2">
                                    <button type="button" class="btn btn-primary form-control mb-1" id="buttonUv">U
                                        V</button>
                                </div>
                                <div class="col-sm-1">
                                    <input type="text" id="quantityUv" name="quantityUv" class="form-control mb-1"
                                        disabled>
                                </div>
                                <div class="col-sm-1">
                                    <input type="text" id="prosentaseUv" name="prosentaseUv"
                                        class="form-control mb-1" disabled>
                                </div>
                            </div>

                            <!-- Anti Static -->
                            <div class="row">
                                <div class="col-sm-2">
                                    <label>Anti Static</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" id="antiStatic" name="antiStatic" class="form-control mb-1"
                                        disabled>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" id="typeAntiStatic" name="typeAntiStatic"
                                        class="form-control mb-1" disabled>
                                </div>
                                <div class="col-sm-2">
                                    <button type="button" class="btn btn-primary form-control mb-1"
                                        id="buttonAntiStatic">Anti Static</button>
                                </div>
                                <div class="col-sm-1">
                                    <input type="text" id="quantityAntiStatic" name="quantityAntiStatic"
                                        class="form-control mb-1" disabled>
                                </div>
                                <div class="col-sm-1">
                                    <input type="text" id="prosentaseAntiStatic" name="prosentaseAntiStatic"
                                        class="form-control mb-1" disabled>
                                </div>
                            </div>

                            <!-- Peletan -->
                            <div class="row">
                                <div class="col-sm-2">
                                    <label>Peletan</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" id="peletan" name="peletan" class="form-control mb-1"
                                        disabled>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" id="typePeletan" name="typePeletan" class="form-control mb-1"
                                        disabled>
                                </div>
                                <div class="col-sm-2">
                                    <button type="button" class="btn btn-primary form-control mb-1"
                                        id="buttonPeletan">Peletan</button>
                                </div>
                                <div class="col-sm-1">
                                    <input type="text" id="quantityPeletan" name="quantityPeletan"
                                        class="form-control mb-1" disabled>
                                </div>
                                <div class="col-sm-1">
                                    <input type="text" id="prosentasePeletan" name="prosentasePeletan"
                                        class="form-control mb-1" disabled>
                                </div>
                            </div>

                            <!-- Additif -->
                            <div class="row">
                                <div class="col-sm-2">
                                    <label>Additif</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" id="additif" name="additif" class="form-control mb-1"
                                        disabled>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" id="typeAdditif" name="typeAdditif" class="form-control mb-1"
                                        disabled>
                                </div>
                                <div class="col-sm-2">
                                    <button type="button" class="btn btn-primary form-control mb-1"
                                        id="buttonAdditif">Additif</button>
                                </div>
                                <div class="col-sm-1">
                                    <input type="text" id="quantityAdditif" name="quantityAdditif"
                                        class="form-control mb-1" disabled>
                                </div>
                                <div class="col-sm-1">
                                    <input type="text" id="prosentaseAdditif" name="prosentaseAdditif"
                                        class="form-control mb-1" disabled>
                                </div>
                            </div>

                            <!-- LLDPE -->
                            <div class="row">
                                <div class="col-sm-2">
                                    <label>LLDPE</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" id="lldpe" name="lldpe" class="form-control mb-1"
                                        disabled>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" id="typeLldpe" name="typeLldpe" class="form-control mb-1"
                                        disabled>
                                </div>
                                <div class="col-sm-2">
                                    <button type="button" class="btn btn-primary form-control mb-1"
                                        id="buttonLldpe">LLDPE</button>
                                </div>
                                <div class="col-sm-1">
                                    <input type="text" id="quantityLldpe" name="quantityLldpe"
                                        class="form-control mb-1" disabled>
                                </div>
                                <div class="col-sm-1">
                                    <input type="text" id="prosentaseLldpe" name="prosentaseLldpe"
                                        class="form-control mb-1" disabled>
                                </div>
                            </div>

                            <!-- LDPE Lami -->
                            <div class="row">
                                <div class="col-sm-2">
                                    <label>LDPE Lami</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" id="ldpeLami" name="ldpeLami" class="form-control mb-1"
                                        disabled>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" id="typeLdpeLami" name="typeLdpeLami"
                                        class="form-control mb-1" disabled>
                                </div>
                                <div class="col-sm-2">
                                    <button type="button" class="btn btn-primary form-control mb-1"
                                        id="buttonLdpeLami">LDPE Lami</button>
                                </div>
                                <div class="col-sm-1">
                                    <input type="text" id="quantityLdpeLami" name="quantityLdpeLami"
                                        class="form-control mb-1" disabled>
                                </div>
                                <div class="col-sm-1">
                                    <input type="text" id="prosentaseLdpeLami" name="prosentaseLdpeLami"
                                        class="form-control mb-1" disabled>
                                </div>
                            </div>

                            <!-- LDPE -->
                            <div class="row">
                                <div class="col-sm-2">
                                    <label>LDPE</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" id="ldpe" name="ldpe" class="form-control mb-1"
                                        disabled>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" id="typeLdpe" name="typeLdpe" class="form-control mb-1"
                                        disabled>
                                </div>
                                <div class="col-sm-2">
                                    <button type="button" class="btn btn-primary form-control mb-1"
                                        id="buttonLdpe">LDPE</button>
                                </div>
                                <div class="col-sm-1">
                                    <input type="text" id="quantityLdpe" name="quantityLdpe"
                                        class="form-control mb-1" disabled>
                                </div>
                                <div class="col-sm-1">
                                    <input type="text" id="prosentaseLdpe" name="prosentaseLdpe"
                                        class="form-control mb-1" disabled>
                                </div>
                            </div>

                            <!-- Conductive -->
                            <div class="row">
                                <div class="col-sm-2">
                                    <label>Conductive</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" id="conductive" name="conductive" class="form-control mb-1"
                                        disabled>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" id="typeConductive" name="typeConductive"
                                        class="form-control mb-1" disabled>
                                </div>
                                <div class="col-sm-2">
                                    <button type="button" class="btn btn-primary form-control mb-1"
                                        id="buttonConductive">Conductive</button>
                                </div>
                                <div class="col-sm-1">
                                    <input type="text" id="quantityConductive" name="quantityConductive"
                                        class="form-control mb-1" disabled>
                                </div>
                                <div class="col-sm-1">
                                    <input type="text" id="prosentaseConductive" name="prosentaseConductive"
                                        class="form-control mb-1" disabled>
                                </div>
                            </div>

                            <!-- HDPE -->
                            <div class="row">
                                <div class="col-sm-2">
                                    <label>HDPE</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" id="hdpe" name="hdpe" class="form-control mb-1"
                                        disabled>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" id="typeHdpe" name="typeHdpe" class="form-control mb-1"
                                        disabled>
                                </div>
                                <div class="col-sm-2">
                                    <button type="button" class="btn btn-primary form-control mb-1"
                                        id="buttonHdpe">HDPE</button>
                                </div>
                                <div class="col-sm-1">
                                    <input type="text" id="quantityHdpe" name="quantityHdpe"
                                        class="form-control mb-1" disabled>
                                </div>
                                <div class="col-sm-1">
                                    <input type="text" id="prosentaseHdpe" name="prosentaseHdpe"
                                        class="form-control mb-1" disabled>
                                </div>
                            </div>

                            <!-- Sweeping -->
                            <div class="row">
                                <div class="col-sm-2">
                                    <label>Sweeping</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" id="sweeping" name="sweeping" class="form-control mb-1"
                                        disabled>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" id="typeSweeping" name="typeSweeping"
                                        class="form-control mb-1" disabled>
                                </div>
                                <div class="col-sm-2">
                                    <button type="button" class="btn btn-primary form-control mb-1"
                                        id="buttonSweeping">Sweeping</button>
                                </div>
                                <div class="col-sm-1">
                                    <input type="text" id="quantitySweeping" name="quantitySweeping"
                                        class="form-control mb-1" disabled>
                                </div>
                                <div class="col-sm-1">
                                    <input type="text" id="prosentaseSweeping" name="prosentaseSweeping"
                                        class="form-control mb-1" disabled>
                                </div>
                            </div>

                            <!-- Injection -->
                            <div class="row">
                                <div class="col-sm-2">
                                    <label>Injection</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" id="injection" name="injection" class="form-control mb-1"
                                        disabled>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" id="typeInjection" name="typeInjection"
                                        class="form-control mb-1" disabled>
                                </div>
                                <div class="col-sm-2">
                                    <button type="button" class="btn btn-primary form-control mb-1"
                                        id="buttonInjection">Injection</button>
                                </div>
                                <div class="col-sm-1">
                                    <input type="text" id="quantityInjection" name="quantityInjection"
                                        class="form-control mb-1" disabled>
                                </div>
                                <div class="col-sm-1">
                                    <input type="text" id="prosentaseInjection" name="prosentaseInjection"
                                        class="form-control mb-1" disabled>
                                </div>
                            </div>

                        </div>


                    </div>
                </div>
            </div>
        </div>
    </div>

    <script type="text/javascript" src="{{ asset('js/QC/Extruder/ExtruderTropodo.js') }}"></script>
    <link rel="stylesheet" href="{{ asset('css/sweetalert2.min.css') }}">
    <script src="{{ asset('js/sweetalert2.all.min.js') }}"></script>
@endsection
