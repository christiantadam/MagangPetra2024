@extends('layouts.appCOA')
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
                    <div class="card-header">ACC COA</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="form-row">
                            <div class="form-group col-md-2">
                                <label for="customer-id">Customer :</label>
                                <input type="text" id="customer-id" name="customer-id" class="form-control" readonly>
                            </div>
                            <div class="form-group col-md-10" style=" margin-top: 31px;">
                                <div class="input-group">
                                    <input type="text" id="nama-cust" name="nama-cust" class="form-control" readonly>
                                    <div class="input-group-append">
                                        <button type="button" id="btn_cust" class="btn btn-info">...</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group col-md-2">
                                <label for="type-id">Type :</label>
                                <input type="text" id="type-id" name="type-id" class="form-control" readonly>
                            </div>
                            <div class="form-group col-md-10" style=" margin-top: 31px;">
                                <div class="input-group">
                                    <input type="text" id="nama-type" name="nama-type" class="form-control" readonly>
                                    <div class="input-group-append">
                                        <button type="button" id="btn_type" class="btn btn-info">...</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="NoCOA">No COA :</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="NoCOA" name="NoCOA" required readonly>
                                <div class="input-group-append">
                                    <button type="button" id="btn_noCOA" class="btn btn-info">...</button>
                                </div>
                            </div>
                        </div>

                        <button type="button" id="btn_acc" class="btn btn-outline-success">ACC</button>

                        <div class="row mt-1">
                            <div class="col-sm-12 d-flex align-items-center justify-content-center bordered">
                                <h4 style="margin: 0;text-decoration: underline;"><strong>CERTIFICATE OF
                                        ANALYSIS</strong></h4>
                            </div>
                        </div>

                        <div class="row mt-1">
                            <div class="col-sm-12 d-flex align-items-center justify-content-center bordered">
                                <h4 id="nomorCoaHead" style="margin: 0;">
                                    <strong>No: </strong>
                                </h4>
                            </div>
                        </div>

                        <!-- Date -->
                        <div class="row mt-4">
                            <div class="col-sm-3">
                                <label>Date</label>
                            </div>
                            <div class="col-sm-1">
                                <label>:</label>
                            </div>
                            <div class="col-sm-8">
                                <span id="dateData">date default</span>
                            </div>
                        </div>
                        <!-- Customer -->
                        <div class="row ">
                            <div class="col-sm-3">
                                <label>Customer</label>
                            </div>
                            <div class="col-sm-1">
                                <label>:</label>
                            </div>
                            <div class="col-sm-8">
                                <span id="customerData">customer default</span>
                            </div>
                        </div>
                        <!-- Po. No. -->
                        <div class="row ">
                            <div class="col-sm-3">
                                <label>Po. No.</label>
                            </div>
                            <div class="col-sm-1">
                                <label>:</label>
                            </div>
                            <div class="col-sm-8">
                                <span id="poNoData">po no default</span>
                            </div>
                        </div>
                        <!-- SP. No. -->
                        <div class="row ">
                            <div class="col-sm-3">
                                <label>SP. No.</label>
                            </div>
                            <div class="col-sm-1">
                                <label>:</label>
                            </div>
                            <div class="col-sm-8">
                                <span id="spNoData">sp no default</span>
                            </div>
                        </div>
                        <!-- Commodity -->
                        <div class="row ">
                            <div class="col-sm-3">
                                <label>Commodity</label>
                            </div>
                            <div class="col-sm-1">
                                <label>:</label>
                            </div>
                            <div class="col-sm-8">
                                <span id="commodityData">commodity default</span>
                            </div>
                        </div>
                        <!-- Type -->
                        <div class="row ">
                            <div class="col-sm-3">
                                <label>Type</label>
                            </div>
                            <div class="col-sm-1">
                                <label>:</label>
                            </div>
                            <div class="col-sm-8">
                                <span id="typeData">type default</span>
                            </div>
                        </div>
                        <!-- Capacity -->
                        <div class="row ">
                            <div class="col-sm-3">
                                <label>Capacity</label>
                            </div>
                            <div class="col-sm-1">
                                <label>:</label>
                            </div>
                            <div class="col-sm-8">
                                <span id="capacityData">capacity default</span>
                            </div>
                        </div>
                        <!-- Dimension -->
                        <div class="row ">
                            <div class="col-sm-3">
                                <label>Dimension</label>
                            </div>
                            <div class="col-sm-1">
                                <label>:</label>
                            </div>
                            <div class="col-sm-8">
                                <span id="dimensionData">dimension default</span>
                            </div>
                        </div>

                        <div class="col-sm-6">
                            <div id="tableContainer"></div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="{{ asset('/js/COA/Master/COAACC.js') }}"></script>
    {{-- <link rel="stylesheet" href="{{ asset('css/COA/FIBCPrint.css') }}"> --}}
    <link rel="stylesheet" href="{{ asset('css/sweetalert2.min.css') }}">
    <script src="{{ asset('js/sweetalert2.all.min.js') }}"></script>
@endsection
