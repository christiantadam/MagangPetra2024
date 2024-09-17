<?php

namespace App\Http\Controllers\Inventory\Transaksi\Mutasi;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HakAksesController;

class PermohonanPenerimaBenangController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Inventory');
        return view('Inventory.Transaksi.Mutasi.AntarDivisi.PermohonanPenerimaBenang', compact('access'));
    }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        //
    }

    //Display the specified resource.
    public function show($id, Request $request)
    {
        $user = Auth::user()->NomorUser;
        $Yidtransaksi = $request->input('Yidtransaksi');
        $kodeTransaksi = $request->input('kodeTransaksi');
        $objekId = $request->input('objekId');
        $divisiNama = $request->input('divisiNama');
        $kodeBarang = $request->input('kodeBarang');
        $namaBarang = $request->input('namaBarang');
        $subkel = $request->input('subkel');
        $YIdTypeKonv = $request->input('YIdTypeKonv');


        if ($id === 'getUserId') {
            return response()->json(['user' => $user]);
        } else if ($id === 'getData') {
            // menampilkan data di data table
            $justData = DB::connection('ConnInventory')->select('
            exec SP_1003_INV_LIST_BELUMACC_TMPTRANSAKSI_1 @kode = 1, @XIdTypeTransaksi = "03", @XIdObjek = ?', [$objekId]);
            if (count($justData) > 0) {
                $data_justData = [];
                foreach ($justData as $detail_justData) {
                    $formattedDate = date('m/d/Y', strtotime($detail_justData->SaatAwalTransaksi));

                    $data_justData[] = [
                        'IdTransaksi' => $detail_justData->IdTransaksi,
                        'NamaType' => $detail_justData->NamaType,
                        'UraianDetailTransaksi' => $detail_justData->UraianDetailTransaksi,
                        'NamaKelompokUtama' => $detail_justData->NamaKelompokUtama,
                        'NamaKelompok' => $detail_justData->NamaKelompok,
                        'NamaSubKelompok' => $detail_justData->NamaSubKelompok,
                        'IdPemberi' => $detail_justData->IdPemberi,
                        'JumlahPengeluaranPrimer' => $detail_justData->JumlahPengeluaranPrimer,
                        'JumlahPengeluaranSekunder' => $detail_justData->JumlahPengeluaranSekunder,
                        'JumlahPengeluaranTritier' => $detail_justData->JumlahPengeluaranTritier,
                        'SaatAwalTransaksi' => $formattedDate,
                        'KodeBarang' => $detail_justData->KodeBarang,
                        'TujuanIdSubkelompok' => $detail_justData->TujuanIdSubkelompok
                    ];
                }
                // dd($data_justData, $request->all());
                return response()->json($data_justData);
            } else {
                return response()->json(['warning' => 'Tidak ada Data Yang Diterima Oleh Divisi : ' . trim($divisiNama)], 200);
            }
        } else if ($id === 'getSelect') {
            $selectData = DB::connection('ConnInventory')->select('exec SP_1003_INV_AsalSubKelompok_TmpTransaksi @XIdTransaksi = ?', [$kodeTransaksi]);
            $data_selectData = [];
            foreach ($selectData as $detail_selectData) {
                $data_selectData[] = [
                    'NamaDivisi' => $detail_selectData->NamaDivisi,
                    'NamaObjek' => $detail_selectData->NamaObjek,
                    'NamaKelompokUtama' => $detail_selectData->NamaKelompokUtama,
                    'NamaKelompok' => $detail_selectData->NamaKelompok,
                    'NamaSubKelompok' => $detail_selectData->NamaSubKelompok,
                    'Satuan_Primer' => $detail_selectData->Satuan_Primer,
                    'Satuan_Sekunder' => $detail_selectData->Satuan_Sekunder,
                    'Satuan_Tritier' => $detail_selectData->Satuan_Tritier
                ];
            }

            // dd($request->all(), $data_selectData);
            return response()->json($data_selectData);
        } else if ($id === 'getTypeKonv') {
            $typeKonv = DB::connection('ConnInventory')->select('exec SP_1003_INV_idsubkelompok_type @XIdSubKelompok_Type = ?', [$subkel]);
            $data_typeKonv = [];
            foreach ($typeKonv as $detail_typeKonv) {
                $data_typeKonv[] = [
                    'IdType' => $detail_typeKonv->IdType,
                    'NamaType' => $detail_typeKonv->NamaType
                ];
            }

            // dd($request->all(), $data_selectData);
            return response()->json($typeKonv);
        } else if ($id === 'getPemberi') {
            $pemberi = DB::connection('ConnInventory')->select('exec SP_1003_INV_check_penyesuaian_pemberi @idtransaksi = ?, @idtypetransaksi = 06', [$Yidtransaksi]);

            $data_pemberi = [];
            foreach ($pemberi as $detail_pemberi) {
                $data_pemberi[] = [
                    'IdType' => $detail_pemberi->IdType,
                    'jumlah' => $detail_pemberi->jumlah
                ];
            }

            // Return the structured data as JSON
            return response()->json($data_pemberi);
        } else if ($id === 'getPenerima') {
            $penerima = DB::connection('ConnInventory')->select('exec SP_1003_INV_check_penyesuaian_penerima @idtransaksi = ?, @idtypetransaksi = 06, @KodeBarang = ?', [$Yidtransaksi, $kodeBarang]);
            $data_penerima = [];
            foreach ($penerima as $detail_penerima) {
                $data_penerima[] = [
                    'IdType' => $detail_penerima->IdType,
                    'jumlah' => $detail_penerima->jumlah
                ];
            }

            // dd($request->all(), $data_penerima);
            return response()->json($penerima);
        } else if ($id === 'getKonversi') {
            $konv = DB::connection('ConnInventory')->select('exec SP_1003_INV_CEK_BENANG @NamaType = ?', [$namaBarang]);
            $data_konv = [];
            foreach ($konv as $detail_konv) {
                $data_konv[] = [
                    'Result' => $detail_konv->Result,
                ];
            }
            // dd($konv);
            return response()->json($konv);
        } else if ($id === 'getPenyesuaianKonversi') {
            $konv = DB::connection('ConnInventory')->select('exec SP_1003_INV_check_penyesuaian @idtype = ?', [$YIdTypeKonv]);
            $data_konv = [];
            foreach ($konv as $detail_konv) {
                $data_konv[] = [
                    'jumlah' => $detail_konv->jumlah,
                ];
            }

            return response()->json($konv);
        } else if ($id === 'getType') {
            $type = DB::connection('ConnInventory')->select('exec SP_1003_INV_LIST_TYPE_BENANG @Nama = ?, @idSubKel = ?', [$namaBarang, $subkel]);
            $data_type = [];
            foreach ($type as $detail_type) {
                $data_type[] = [
                    'IdType' => $detail_type->IdType
                ];
            }

            return response()->json($type);
        }
    }

    // Show the form for editing the specified resource.
    public function edit($id)
    {
        //
    }

    //Update the specified resource in storage.
    public function update(Request $request, $id)
    {
        $Yidtransaksi = $request->input('Yidtransaksi');
        $primer = trim($request->input('primer'));
        $sekunder = trim($request->input('sekunder'));
        $tritier = trim($request->input('tritier'));
        $YidType = $request->input('YidType');
        $YidTypePenerima = $request->input('YidTypePenerima');
        $user = Auth::user()->NomorUser;
        $idTrans = $request->input('idTrans');
        $sIdKonv = $request->input('sIdKonv');
        $NmError = null;
        // dd($request->all());


        if ($id === 'proses') {

            DB::connection('ConnInventory')->beginTransaction();
            try {

                // Step 1: Fetch status from tmp_transaksi
                $status = DB::connection('ConnInventory')->table('tmp_transaksi')
                    ->where('idtransaksi', $Yidtransaksi)
                    ->value('status');

                if ($status === '1') {
                    $NmError = 'Data sudah pernah di ACC';
                    return response()->json(['Nmerror' => $NmError]);
                }

                // Step 2: Fetch Pemberi data from vw_prg_type
                $pemberiData = DB::connection('ConnInventory')->table('vw_prg_type')
                    ->where('idtype', $YidType)
                    ->where('NonAktif', 'Y')
                    ->first();

                // Step 3: Fetch Penerima data from vw_prg_type
                $penerimaData = DB::connection('ConnInventory')->table('vw_prg_type')
                    ->where('idtype', $YidTypePenerima)
                    ->where('NonAktif', 'Y')
                    ->first();

                // dd($request->all(), $pemberiData, $penerimaData);

                $SaldoPrimerBeri = trim($pemberiData->SaldoPrimer);
                $SaldoSekunderBeri = trim($pemberiData->SaldoSekunder);
                $SaldoTritierBeri = trim($pemberiData->SaldoTritier);
                $konv1Beri = $pemberiData->KonvSekunderKePrimer;
                $konv2Beri = $pemberiData->KonvTritierKeSekunder;
                $UnitPrimerBeri = $pemberiData->UnitPrimer;
                $UnitSekunderBeri = $pemberiData->UnitSekunder;
                $UnitTritierBeri = $pemberiData->UnitTritier;
                $PakaiAturanKonversiBeri = $pemberiData->PakaiAturanKonversi;
                $MinimumStockBeri = $pemberiData->MinimumStock;
                $satuanUmumBeri = $pemberiData->SatuanUmum;

                $SaldoPrimerTerima = trim($penerimaData->SaldoPrimer);
                $SaldoSekunderTerima = trim($penerimaData->SaldoSekunder);
                $SaldoTritierTerima = trim($penerimaData->SaldoTritier);
                $konv1Terima = $penerimaData->KonvSekunderKePrimer;
                $konv2Terima = $penerimaData->KonvTritierKeSekunder;
                $UnitPrimerTerima = $penerimaData->UnitPrimer;
                $UnitSekunderTerima = $penerimaData->UnitSekunder;
                $UnitTritierTerima = $penerimaData->UnitTritier;
                $PakaiAturanKonversiTerima = $penerimaData->PakaiAturanKonversi;
                $MinimumStockTerima = $penerimaData->MinimumStock;
                $satuanUmumTerima = $penerimaData->SatuanUmum;
                $MaxStockTerima = $penerimaData->MaximumStock;


                // Step 4: Check if Satuan Tritier is the same
                if ($UnitTritierBeri !== $UnitTritierTerima) {
                    $NmError = 'Satuan Paling Kecil Antara Pemberi dan Penerima Tidak Sama';
                    return response()->json(['Nmerror' => $NmError]);
                }

                // Step 5: Check stock constraints for Pemberi
                if ($PakaiAturanKonversiBeri !== 'Y') {
                    if ($SaldoPrimerBeri - $primer < 0) {
                        $NmError = 'Karena Saldo akhir Primer Tinggal: ' . $SaldoPrimerBeri . '. Divisi Pemberi Tidak boleh memberi: ' . $primer;
                        return response()->json(['Nmerror' => $NmError]);
                    }

                    if ($SaldoSekunderBeri - $sekunder < 0) {
                        $NmError = 'Karena Saldo akhir Sekunder Tinggal: ' . $SaldoSekunderBeri . '. Divisi Pemberi Tidak boleh memberi: ' . $sekunder;
                        return response()->json(['Nmerror' => $NmError]);
                    }

                    if ($SaldoTritierBeri - $tritier < 0) {
                        $NmError = 'Karena Saldo akhir Tritier Tinggal: ' . $SaldoTritierBeri . '. Divisi Pemberi Tidak boleh memberi: ' . $tritier;
                        return response()->json(['Nmerror' => $NmError]);
                    }

                    // Minimum stock validation
                    if ($MinimumStockBeri != 0) {
                        if ($satuanUmumBeri == $UnitPrimerBeri && ($SaldoPrimerBeri - $primer) < $MinimumStockBeri) {
                            $NmError = 'Karena Jumlah Yang Diberikan Melebihi Minimum Stoknya Divisi Pemberi (Dalam Satuan Primer) : ' . trim($MinimumStockBeri);
                            return response()->json(['Nmerror' => $NmError]);
                        }

                        if ($satuanUmumBeri == $UnitSekunderBeri && ($SaldoSekunderBeri - $sekunder) < $MinimumStockBeri) {
                            $NmError = 'Karena Jumlah Yang Diberikan Melebihi Minimum Stoknya Divisi Pemberi (Dalam Satuan Sekunder) : ' . trim($MinimumStockBeri);
                            return response()->json(['Nmerror' => $NmError]);
                        }

                        if ($satuanUmumBeri == $UnitTritierBeri && ($SaldoTritierBeri - $tritier) < $MinimumStockBeri) {
                            $NmError = 'Karena Jumlah Yang Diberikan Melebihi Minimum Stoknya Divisi Pemberi (Dalam Satuan Tritier) : ' . trim($MinimumStockBeri);
                            return response()->json(['Nmerror' => $NmError]);
                        }
                    }
                }

                $penerimaKonversi = DB::connection('ConnInventory')->table('type')
                    ->where('idtype', $YidTypePenerima)
                    ->value('PakaiAturanKonversi');

                // dd($penerimaKonversi);

                if ($penerimaKonversi === 'Y') {
                    $NmError = 'Karena Program Belum Bisa MengAcc Jika Penerima memakai aturan Konversi';
                    return response()->json(['Nmerror' => $NmError]);
                }

                if ($PakaiAturanKonversiBeri === 'Y') {
                    // Check if both konv1 and konv2 are not zero
                    if ($konv1Beri != 0 && $konv2Beri != 0) {
                        $NmError = 'Karena Program Belum Sampai Pada Pemakaian 2 Konversi';
                        return response()->json(['Nmerror' => $NmError]);
                    }

                    // If konv1 is 0 and konv2 is not 0
                    if ($konv1Beri === 0 && $konv2Beri !== 0) {
                        // Check if satUmum1 is equal to satPrimer1
                        if ($satuanUmumBeri == $UnitPrimerBeri) {
                            $NmError = 'Untuk Div Pemberi, Konversi hanya sekunder ke tritier maka untuk nilai PRIMER Tidak boleh di ISI';
                            return response()->json(['Nmerror' => $NmError]);
                        }

                        // If satUmum1 equals satSekunder1
                        if ($satuanUmumBeri === $UnitSekunderBeri) {
                            $JumlahKeluar = $sekunder + ceil($tritier / $konv2Beri);

                            // Check if saldoSekunder minus JumlahKeluar is less than MinStok
                            if ($SaldoSekunderBeri - $JumlahKeluar < $MinimumStockBeri) {
                                $NmError = 'Karena Jumlah Yang Diminta Melebihi Minimum Stoknya Divisi Pemberi (Dalam Satuan Sekunder): ' . trim($MinimumStockBeri);
                                return response()->json(['Nmerror' => $NmError]);
                            }
                        }

                        // If satUmum1 equals satTritier1
                        if ($satuanUmumBeri === $UnitTritierBeri) {
                            $JumlahKeluar = ($konv2Beri * $sekunder) + $tritier;

                            // Check if saldoTritier minus JumlahKeluar is less than MinStok
                            if ($SaldoTritierBeri - $JumlahKeluar < $MinimumStockBeri) {
                                $NmError = 'Karena Jumlah Yang Diminta Melebihi Minimum Stoknya Divisi Pemberi (Dalam Satuan Tritier): ' . trim($MinimumStockBeri);
                                return response()->json(['Nmerror' => $NmError]);
                            }
                        }
                    }
                }

                $idTransaksi = DB::connection('ConnInventory')->table('counter')->value('idtransaksi');
                $idTransaksi += 1;

                DB::connection('ConnInventory')->statement('exec SP_1003_INV_Update_IdTransaksi_Counter @XIdTransaksi = ?', [$idTransaksi]);

                $YidTransaksi2 = str_pad($idTransaksi, 9, '0', STR_PAD_LEFT);
                // dd($YidTransaksi2);



                if ($PakaiAturanKonversiBeri === 'Y') {
                    if ($konv1Beri === 0 && $konv2Beri !== 0) {
                        $tmpSaldo = ($konv2Beri * $SaldoSekunderBeri) + $SaldoTritierBeri;

                        // Check if saldo is sufficient
                        if ($tmpSaldo - ($konv2Beri * $sekunder) - $tritier < 0) {
                            $NmError = 'Saldo akhir Tritier Divisi Pemberi Tinggal : ' . trim($SaldoPrimerBeri) . ', Tidak boleh memberi: ' . trim($tritier);
                            return response()->json(['Nmerror' => $NmError]);
                        }

                        // Handle cases where Sekunder is 0 and Tritier > 0
                        if ($sekunder == 0 && $tritier > 0) {
                            if ($SaldoTritierBeri >= $tritier) {
                                // Call stored procedure or function to update saldo type
                                DB::connection('ConnInventory')->statement('EXEC SP_1003_INV_Update_SaldoType_Keluar ?, ?, ?, ?, ?, ?, ?', [
                                    $YidType,
                                    $primer,
                                    $sekunder,
                                    $tritier,
                                    $SaldoPrimerBeri,
                                    $SaldoSekunderBeri,
                                    $SaldoTritierBeri
                                ]);
                            } else {
                                $B = ceil($tritier / $konv2Beri);
                                $SaldoTritierBeri = $SaldoTritierBeri + (($B * $konv2Beri) - $tritier);
                                $SaldoSekunderBeri = $SaldoSekunderBeri - $B;

                                // Update type table with new saldo values
                                DB::connection('ConnInventory')->table('type')
                                    ->where('idtype', $YidType)
                                    ->update([
                                        'saldoSekunder' => $SaldoSekunderBeri,
                                        'TotalPengeluaranSekunder' => DB::raw('TotalPengeluaranSekunder + ?', [$B]),
                                        'saldoTritier' => $SaldoTritierBeri,
                                        'TotalPemasukanTritier' => DB::raw('TotalPemasukanTritier + (? * ?)', [$B, $konv2Beri]),
                                        'TotalPengeluaranTritier' => DB::raw('TotalPengeluaranTritier + ?', [$tritier])
                                    ]);
                            }
                        }

                        // Handle cases where Sekunder > 0
                        if ($sekunder > 0) {
                            if ($SaldoSekunderBeri - $sekunder < 0) {
                                $NmError = 'Saldo akhir Sekunder Divisi Pemberi Tinggal: ' . trim($SaldoSekunderBeri) . ', Tidak boleh memberi: ' . trim($tritier);
                                return response()->json(['Nmerror' => $NmError]);
                            } else {
                                // Both Sekunder and Tritier are filled, update saldo
                                if ($SaldoTritierBeri >= $tritier && $SaldoSekunderBeri >= $sekunder) {
                                    // Call stored procedure or function to update saldo type
                                    DB::connection('ConnInventory')->statement('EXEC SP_1003_INV_Update_SaldoType_Keluar ?, ?, ?, ?, ? ,?, ?', [
                                        $YidType,
                                        $primer,
                                        $sekunder,
                                        $tritier,
                                        $SaldoPrimerBeri,
                                        $SaldoSekunderBeri,
                                        $SaldoTritierBeri
                                    ]);
                                } else {
                                    // Handle mixed cases where Sekunder and Tritier are insufficient
                                    if ($SaldoTritierBeri < $tritier) {
                                        $B = ceil($tritier / $konv2Beri);
                                        if ($B > $SaldoSekunderBeri) {
                                            $B = $SaldoSekunderBeri;
                                        }
                                        $SaldoTritierBeri = $SaldoTritierBeri + (($B * $konv2Beri) - $tritier);
                                        $SaldoSekunder = $SaldoSekunderBeri - $B;
                                    }
                                    $SaldoSekunder = $SaldoSekunder - $sekunder;

                                    // Update type table with new saldo values
                                    DB::connection('ConnInventory')->table('type')
                                        ->where('idtype', $YidType)
                                        ->update([
                                            'saldoSekunder' => $SaldoSekunder,
                                            'TotalPengeluaranSekunder' => DB::raw('TotalPengeluaranSekunder + (' . $B . ' + ' . $sekunder . ')'),
                                            'saldoTritier' => $SaldoTritierBeri,
                                            'TotalPemasukanTritier' => DB::raw('TotalPemasukanTritier + (' . $B . ' * ' . $konv2Beri . ')'),
                                            'TotalPengeluaranTritier' => DB::raw('TotalPengeluaranTritier + ' . $tritier)
                                        ]);
                                }
                            }
                        }
                    }
                } else {
                    DB::connection('ConnInventory')->statement('EXEC SP_1003_INV_Update_SaldoType_Keluar ?, ?, ?, ?, ? ,?, ?', [
                        $YidType,
                        $primer,
                        $sekunder,
                        $tritier,
                        $SaldoPrimerBeri,
                        $SaldoSekunderBeri,
                        $SaldoTritierBeri
                    ]);
                }


                // if (condition) {
                //     # code...
                // }

                $result = DB::connection('ConnInventory')->table('tmp_transaksi')
                    ->select(
                        'IdTransaksi',
                        'IdTypeTransaksi',
                        'UraianDetailTransaksi',
                        'IdType',
                        'IdPenerima',
                        'IdPemberi',
                        'SaatAwalTransaksi',
                        'SaatAkhirTransaksi',
                        'SaatLog',
                        'KomfirmasiPenerima',
                        'KomfirmasiPemberi',
                        'SaatAwalKomfirmasi',
                        'SaatAkhirKomfirmasi',
                        'JumlahPemasukanPrimer',
                        'JumlahPemasukanSekunder',
                        'JumlahPemasukanTritier',
                        'JumlahPengeluaranPrimer',
                        'JumlahPengeluaranSekunder',
                        'JumlahPengeluaranTritier',
                        'AsalIdSubKelompok',
                        'TujuanIdSubKelompok',
                        'Posisi',
                        'TimeInput'
                    )
                    ->where('IdTransaksi', $Yidtransaksi)
                    ->first();

                $saldoberi = [
                    'SaldoPrimer' => (float) $SaldoPrimerBeri,
                    'SaldoSekunder' => (float) $SaldoSekunderBeri,
                    'SaldoTritier' => (float) $SaldoTritierBeri
                ];

                // dd($result, $saldo);

                $data = [
                    'IdTransaksi' => $result->IdTransaksi,
                    'IdTypeTransaksi' => $result->IdTypeTransaksi,
                    'UraianDetailTransaksi' => $result->UraianDetailTransaksi,
                    'IdType' => $result->IdType,
                    'IdPenerima' => $user,
                    'IdPemberi' => $result->IdPemberi,
                    'SaatAwalTransaksi' => $result->SaatAwalTransaksi,
                    'SaatAkhirTransaksi' => now()->format('Y-m-d H:i:s'),
                    'SaatLog' => now()->format('Y-m-d H:i:s'),
                    'KomfirmasiPenerima' => $user,
                    'KomfirmasiPemberi' => $result->KomfirmasiPemberi,
                    'SaatAwalKomfirmasi' => $result->SaatAwalKomfirmasi,
                    'SaatAkhirKomfirmasi' => now()->format('Y-m-d H:i:s'),
                    'JumlahPemasukanPrimer' => $result->JumlahPemasukanPrimer,
                    'JumlahPemasukanSekunder' => $result->JumlahPemasukanSekunder,
                    'JumlahPemasukanTritier' => $result->JumlahPemasukanTritier,
                    'JumlahPengeluaranPrimer' => $result->JumlahPengeluaranPrimer,
                    'JumlahPengeluaranSekunder' => $result->JumlahPengeluaranSekunder,
                    'JumlahPengeluaranTritier' => $result->JumlahPengeluaranTritier,
                    'AsalIdSubKelompok' => $result->AsalIdSubKelompok,
                    'TujuanIdSubKelompok' => $result->TujuanIdSubKelompok,
                    'Posisi' => $result->Posisi,
                    'SaldoPrimer' => $saldoberi['SaldoPrimer'],
                    'SaldoSekunder' => $saldoberi['SaldoSekunder'],
                    'SaldoTritier' => $saldoberi['SaldoTritier'],
                    'TimeInput' => $result->TimeInput
                ];

                // dd($data);

                // Insert into Transaksi table
                DB::connection('ConnInventory')->table('Transaksi')->insert($data);

                if ($PakaiAturanKonversiBeri === 'Y') {
                    $tritier += ($konv2Beri * $sekunder);
                    $sekunder = 0;
                }
                // dd($data);

                // Check if MaxStok is greater than 0
                if ($MaxStockTerima > 0) {
                    if ($satuanUmumTerima === $UnitPrimerTerima) {
                        if ($SaldoPrimerTerima + $primer > $MaxStockTerima) {
                            $NmError = 'Karena Max Stok Divisi Penerima (Dalam Satuan Primer) sebesar : ' . trim($MaxStockTerima);
                            return response()->json(['error' => $NmError], 400);
                        }
                    }
                    if ($satuanUmumTerima === $UnitSekunderTerima) {
                        if ($SaldoSekunderTerima + $sekunder > $MaxStockTerima) {
                            $NmError = 'Karena Max Stok Divisi Penerima (Dalam Satuan Sekunder) sebesar : ' . trim($MaxStockTerima);
                            return response()->json(['error' => $NmError], 400);
                        }
                    }
                    if ($satuanUmumTerima === $UnitTritierTerima) {
                        if ($SaldoTritierTerima + $tritier > $MaxStockTerima) {
                            $NmError = 'Karena Max Stok Divisi Penerima (Dalam Satuan Tritier) sebesar : ' . trim($MaxStockTerima);
                            return response()->json(['error' => $NmError], 400);
                        }
                    }
                }

                $currentIdTransaksi = DB::connection('ConnInventory')->table('counter')->value('idtransaksi');
                $newIdTransaksi = $currentIdTransaksi + 1;

                DB::connection('ConnInventory')->statement('exec SP_1003_INV_Update_IdTransaksi_Counter ?', [$newIdTransaksi]);
                $YIdTransaksiPenerima = str_pad($newIdTransaksi, 9, '0', STR_PAD_LEFT);
                // dd($YIdTransaksiPenerima);

                DB::connection('ConnInventory')->statement('EXEC SP_1003_INV_Update_SaldoType_Masuk ?, ?, ?, ?, ? ,?, ?', [
                    $YidTypePenerima,
                    $primer,
                    $sekunder,
                    $tritier,
                    $SaldoPrimerTerima,
                    $SaldoSekunderTerima,
                    $SaldoTritierTerima
                ]);

                $result = DB::connection('ConnInventory')->table('tmp_transaksi')
                    ->select(
                        'IdTransaksi',
                        'IdTypeTransaksi',
                        'UraianDetailTransaksi',
                        'IdType',
                        'IdPenerima',
                        'IdPemberi',
                        'SaatAwalTransaksi',
                        'SaatAkhirTransaksi',
                        'SaatLog',
                        'KomfirmasiPenerima',
                        'KomfirmasiPemberi',
                        'SaatAwalKomfirmasi',
                        'SaatAkhirKomfirmasi',
                        'JumlahPemasukanPrimer',
                        'JumlahPemasukanSekunder',
                        'JumlahPemasukanTritier',
                        'JumlahPengeluaranPrimer',
                        'JumlahPengeluaranSekunder',
                        'JumlahPengeluaranTritier',
                        'AsalIdSubKelompok',
                        'TujuanIdSubKelompok',
                        'Posisi',
                        'TimeInput'
                    )
                    ->where('IdTransaksi', $Yidtransaksi)
                    ->first();

                $saldoterima = [
                    'SaldoPrimer' => (float) $SaldoPrimerTerima,
                    'SaldoSekunder' => (float) $SaldoSekunderTerima,
                    'SaldoTritier' => (float) $SaldoTritierTerima
                ];

                // dd($result, $saldoterima);

                $data = [
                    'IdTransaksi' => $YIdTransaksiPenerima,
                    'IdTypeTransaksi' => $result->IdTypeTransaksi,
                    'UraianDetailTransaksi' => $result->UraianDetailTransaksi,
                    'IdType' => $YidTypePenerima,
                    'IdPenerima' => $user,
                    'IdPemberi' => $result->IdPemberi,
                    'SaatAwalTransaksi' => $result->SaatAwalTransaksi,
                    'SaatAkhirTransaksi' => now()->format('Y-m-d H:i:s'),
                    'SaatLog' => now()->format('Y-m-d H:i:s'),
                    'KomfirmasiPenerima' => $user,
                    'KomfirmasiPemberi' => $result->KomfirmasiPemberi,
                    'SaatAwalKomfirmasi' => $result->SaatAwalKomfirmasi,
                    'SaatAkhirKomfirmasi' => now()->format('Y-m-d H:i:s'),
                    'JumlahPengeluaranPrimer' => $primer,
                    'JumlahPengeluaranSekunder' => $sekunder,
                    'JumlahPengeluaranTritier' => $tritier,
                    'JumlahPemasukanPrimer' => $result->JumlahPemasukanPrimer,
                    'JumlahPemasukanSekunder' => $result->JumlahPemasukanSekunder,
                    'JumlahPemasukanTritier' => $result->JumlahPemasukanTritier,
                    'AsalIdSubKelompok' => $result->AsalIdSubKelompok,
                    'TujuanIdSubKelompok' => $result->TujuanIdSubKelompok,
                    'Posisi' => $result->Posisi,
                    'IdTransaksi_Acuan' => $YidTransaksi2,
                    'SaldoPrimer' => $saldoterima['SaldoPrimer'],
                    'SaldoSekunder' => $saldoterima['SaldoSekunder'],
                    'SaldoTritier' => $saldoterima['SaldoTritier'],
                    'TimeInput' => $result->TimeInput
                ];

                // dd($data);

                // Insert into Transaksi table
                DB::connection('ConnInventory')->table('Transaksi')->insert($data);

                DB::connection('ConnInventory')->statement('exec SP_1003_INV_UPDATE_STATUS_TMPTRANSAKSI ?', [$Yidtransaksi]);

                DB::connection('ConnInventory')->table('tmp_transaksi')
                    ->where('idtransaksi', $Yidtransaksi)
                    ->update(['idtrans' => $YidTransaksi2]);

                // DB::commit();

                // Step 6: Transaction process for Pemberi and Penerima
                $YIdTransaksi = DB::connection('ConnInventory')->table('counter')->increment('idtransaksi');
                // dd($YIdTransaksi);



                $divisi = DB::connection('ConnInventory')->table('Type')
                    ->join('Subkelompok', 'Type.IdSubkelompok_Type', '=', 'Subkelompok.IdSubkelompok')
                    ->join('Kelompok', 'Subkelompok.IdKelompok_Subkelompok', '=', 'Kelompok.IdKelompok')
                    ->join('KelompokUtama', 'Kelompok.IdKelompokUtama_Kelompok', '=', 'KelompokUtama.IdKelompokUtama')
                    ->join('Objek', 'KelompokUtama.IdObjek_KelompokUtama', '=', 'Objek.IdObjek')
                    ->join('Divisi', 'Objek.IdDivisi_Objek', '=', 'Divisi.IdDivisi')
                    ->where('Type.IdType', $YidTypePenerima)
                    ->value('Divisi.IdDivisi');

                // dd($divisi);

                // Step 2: Conditionally execute stored procedure
                if ($divisi === 'INV') {
                    DB::connection('ConnInventory')->statement('EXEC SP_1003_INV_dispresiasi ?, ?, ?, ?', [
                        $YidType,
                        $YidTypePenerima,
                        $tritier,
                        '03'
                    ]);
                }

                DB::connection('ConnInventory')->commit();

                return response()->json([
                    'Nmerror' => 'BENAR',
                    'IdTransPenerima' => $YIdTransaksiPenerima
                ]);
            } catch (\Exception $e) {
                // DB::rollBack();
                DB::connection('ConnInventory')->rollBack();
                return response()->json(['Nmerror' => $e->getMessage()]);
            }
        } else if ($id === 'getIdKonv') {
            $results = DB::connection('ConnInventory')->statement('exec SP_1003_INV_IDKONVERSI');
            // $idKonversi = $results[0]->IDKonversi;

            return response()->json(['success' => 'ada'], 200);
        } else if ('getIdKonvNumber') {
            $currentId = DB::connection('ConnInventory')->table('counter')->value('idkonversi');

            $newId = $currentId + 1;
            $idKonversi = str_pad($newId, 9, '0', STR_PAD_LEFT);

            return response()->json(['IDKonversi' => $idKonversi]);
        } else if ($id === 'saveDataAsal') {
            try {
                DB::connection('ConnInventory')->statement(
                    'exec SP_1003_INV_TRANSFER_BENANG_CL
                    @idkonversi = ?, @UraianDetailTransaksi = ?, @IdType=  ?, @UserAcc = ?,
                    @KeluarPrimer = ?, @KeluarSekunder = ?, @KeluarTritier = ?,
                    @AsalSubKel = ?,  @IdTRansaksi_Acuan = ?',
                    [
                        $sIdKonv,
                        'Asal Konversi',
                        $YidTypePenerima,
                        $user,
                        $primer,
                        $sekunder,
                        $tritier,
                        $idTrans
                    ]
                );

                return response()->json(['success' => 'Data sudah diSIMPAN'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Gagal diProses. ' . $e->getMessage()], 500);
            }
        } else if ($id === 'saveDataTujuan') {
            try {
                DB::connection('ConnInventory')->statement(
                    'exec SP_1003_INV_TRANSFER_BENANG_CL
                    @idkonversi = ?, @UraianDetailTransaksi = ?, @IdType=  ?, @UserAcc = ?,
                    @MasukPrimer = ?, @MasukSekunder = ?, @MasukTritier = ?, @TujuanSubkel = ?',
                    [
                        $sIdKonv,
                        'Tujuan Konversi',
                        $YidTypePenerima,
                        $user,
                        $primer,
                        $sekunder,
                        $tritier,
                        $idTrans
                    ]
                );

                return response()->json(['success' => 'Data sudah diSIMPAN'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Gagal diProses. ' . $e->getMessage()], 500);
            }
        }
    }

    //Remove the specified resource from storage.
    public function destroy(Request $request)
    {
        //
    }
}
