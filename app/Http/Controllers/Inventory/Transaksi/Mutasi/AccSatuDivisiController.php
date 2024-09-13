<?php

namespace App\Http\Controllers\Inventory\Transaksi\Mutasi;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HakAksesController;

class AccSatuDivisiController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Inventory');
        return view('Inventory.Transaksi.Mutasi.SatuDivisi.AccSatuDivisi', compact('access'));
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
    public function show(Request $request, $id)
    {
        $user = Auth::user()->NomorUser;

        if ($id === 'getUserId') {
            return response()->json(['user' => $user]);
        }

        // get divisi
        else if ($id === 'getDivisi') {
            $divisi = DB::connection('ConnInventory')->select('exec SP_1003_INV_userdivisi @XKdUser = ?', [$user]);
            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'NamaDivisi' => $detail_divisi->NamaDivisi,
                    'IdDivisi' => $detail_divisi->IdDivisi,
                    'KodeUser' => $detail_divisi->KodeUser
                ];
            }
            return datatables($divisi)->make(true);
        }

        // objek
        else if ($id === 'getObjek') {
            $objek = DB::connection('ConnInventory')->select('exec SP_1003_INV_User_Objek @XKdUser = ?, @XIdDivisi = ?', [$user, $request->input('divisi')]);
            $data_objek = [];
            foreach ($objek as $detail_objek) {
                $data_objek[] = [
                    'NamaObjek' => $detail_objek->NamaObjek,
                    'IdObjek' => $detail_objek->IdObjek,
                    'IdDivisi' => $detail_objek->IdDivisi
                ];
            }
            return datatables($objek)->make(true);
        }

        // tampil data
        else if ($id === 'tampilData') {
            $XIdDivisi = $request->input('XIdDivisi');

            $subkel = DB::connection('ConnInventory')->select('exec SP_1003_INV_List_BelumAcc_TmpTransaksi
            @kode = ?, @XIdDivisi = ?, @XIdTypeTransaksi = ?', [9, $XIdDivisi, '01']);
            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'IdTransaksi' => $detail_subkel->IdTransaksi,  // From dbo.Tmp_Transaksi.IdTransaksi
                    'SaatAwalTransaksi' => $detail_subkel->SaatAwalTransaksi,  // From dbo.Tmp_Transaksi.SaatAwalTransaksi
                    'NamaType' => $detail_subkel->NamaType,        // From dbo.Type.NamaType
                    'UraianDetailTransaksi' => $detail_subkel->UraianDetailTransaksi, // From dbo.Tmp_Transaksi.UraianDetailTransaksi
                    'NamaDivisi' => $detail_subkel->NamaDivisi,    // From dbo.Divisi.NamaDivisi
                    'NamaObjek' => $detail_subkel->NamaObjek,      // From dbo.Objek.NamaObjek
                    'NamaKelompokUtama' => $detail_subkel->NamaKelompokUtama, // From dbo.KelompokUtama.NamaKelompokUtama
                    'NamaKelompok' => $detail_subkel->NamaKelompok, // From dbo.Kelompok.NamaKelompok
                    'NamaSubKelompok' => $detail_subkel->NamaSubKelompok, // From dbo.Subkelompok.NamaSubKelompok
                    'IdPemberi' => $detail_subkel->IdPemberi,      // From dbo.UserLogin.NamaUser AS IdPemberi
                    'JumlahPengeluaranPrimer' => $detail_subkel->JumlahPengeluaranPrimer, // From dbo.Tmp_Transaksi.JumlahPengeluaranPrimer
                    'JumlahPengeluaranSekunder' => $detail_subkel->JumlahPengeluaranSekunder, // From dbo.Tmp_Transaksi.JumlahPengeluaranSekunder
                    'JumlahPengeluaranTritier' => $detail_subkel->JumlahPengeluaranTritier, // From dbo.Tmp_Transaksi.JumlahPengeluaranTritier
                    'KodeBarang' => $detail_subkel->KodeBarang,    // From dbo.Type.KodeBarang
                ];
            }
            return response()->json($data_subkel);
        }

        // get saldo 
        else if ($id === 'tampilItem') {
            $XIdTransaksi = $request->input('XIdTransaksi');

            $subkel = DB::connection('ConnInventory')->select('exec SP_1003_INV_TujuanSubKelompok_TmpTransaksi
            @XIdTransaksi = ?', [$XIdTransaksi]);
            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'IdType' => $detail_subkel->IdType,
                    'IdDivisi' => $detail_subkel->IdDivisi,
                    'NamaDivisi' => $detail_subkel->NamaDivisi,
                    'IdObjek' => $detail_subkel->IdObjek,
                    'NamaObjek' => $detail_subkel->NamaObjek,
                    'IdKelompokUtama' => $detail_subkel->IdKelompokUtama,
                    'NamaKelompokUtama' => $detail_subkel->NamaKelompokUtama,
                    'IdKelompok' => $detail_subkel->IdKelompok,
                    'NamaKelompok' => $detail_subkel->NamaKelompok,
                    'IdSubkelompok' => $detail_subkel->IdSubkelompok,
                    'NamaSubKelompok' => $detail_subkel->NamaSubKelompok,
                    'SaldoPrimer' => $detail_subkel->SaldoPrimer,
                    'SaldoSekunder' => $detail_subkel->SaldoSekunder,
                    'SaldoTritier' => $detail_subkel->SaldoTritier,
                    'SaatAwalTransaksi' => $detail_subkel->SaatAwalTransaksi,
                    'UraianDetailTransaksi' => $detail_subkel->UraianDetailTransaksi,
                    'JumlahPemasukanPrimer' => $detail_subkel->JumlahPemasukanPrimer,
                    'JumlahPemasukanSekunder' => $detail_subkel->JumlahPemasukanSekunder,
                    'JumlahPemasukanTritier' => $detail_subkel->JumlahPemasukanTritier,
                    'JumlahPengeluaranPrimer' => $detail_subkel->JumlahPengeluaranPrimer,
                    'JumlahPengeluaranSekunder' => $detail_subkel->JumlahPengeluaranSekunder,
                    'JumlahPengeluaranTritier' => $detail_subkel->JumlahPengeluaranTritier,
                    'Satuan_Primer' => $detail_subkel->Satuan_Primer,
                    'Satuan_Sekunder' => $detail_subkel->Satuan_Sekunder,
                    'Satuan_Tritier' => $detail_subkel->Satuan_Tritier,
                    'KodeBarang' => $detail_subkel->KodeBarang,
                    'PakaiAturanKonversi' => $detail_subkel->PakaiAturanKonversi,
                    'KonvSekunderKePrimer' => $detail_subkel->KonvSekunderKePrimer,
                    'KonvTritierKeSekunder' => $detail_subkel->KonvTritierKeSekunder

                ];
            }
            return response()->json($data_subkel);
        }

        // cek pemberi
        else if ($id === 'cekSesuaiPemberi') {
            $idtransaksi = $request->input('idtransaksi');

            $divisi = DB::connection('ConnInventory')->select('exec [SP_1003_INV_check_penyesuaian_transaksi]
           @Kode = ?, @idtransaksi = ?, @idtypetransaksi = ?', [1, $idtransaksi, '06']);

            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'jumlah' => $detail_divisi->jumlah,
                    'IdType' => $detail_divisi->IdType,
                ];
            }

            return response()->json($data_divisi);
        }

        // cek Penerima
        else if ($id === 'cekSesuaiPenerima') {
            $idtransaksi = $request->input('idtransaksi');
            $KodeBarang = $request->input('KodeBarang');

            $divisi = DB::connection('ConnInventory')->select('exec [SP_1003_INV_check_penyesuaian_transaksi]
           @idtransaksi = ?, @idtypetransaksi = ?, @KodeBarang = ?', [$idtransaksi, '06', $KodeBarang]);

            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'jumlah' => $detail_divisi->jumlah,
                    'IdType' => $detail_divisi->IdType,
                ];
            }

            return response()->json($data_divisi);
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
        $user = Auth::user()->NomorUser;

        if ($id == 'proses') {
            $IdTransaksi = $request->input('IdTransaksi');
            $JumlahKeluarPrimer = $request->input('JumlahKeluarPrimer');
            $JumlahKeluarSekunder = $request->input('JumlahKeluarSekunder');
            $JumlahKeluarTritier = $request->input('JumlahKeluarTritier');

            try {
                // Mengambil data dari Tmp_transaksi
                $result = DB::connection('ConnInventory')->table('Tmp_transaksi')
                    ->select('idtype as YIdType', 'IdPemberi as YIdPenerima')
                    ->where('idtransaksi', $IdTransaksi)
                    ->first();

                if ($result) {
                    $YIdType = $result->YIdType;
                } else {
                    return response()->json(['NmError' => 'IdTransaksi tidak ditemukan.'], 400);
                }

                // Mengambil saldo dari Type berdasarkan IdType
                $result = DB::connection('ConnInventory')->table('Type')
                    ->select('SaldoTritier', 'SaldoSekunder', 'SaldoPrimer', 'PIB')
                    ->where('IdType', $YIdType)
                    ->first();

                if ($result) {
                    $sTritier = $result->SaldoTritier;
                    $sSekunder = $result->SaldoSekunder;
                    $sPrimer = $result->SaldoPrimer;

                    // dd($sTritier - $JumlahKeluarTritier, $sSekunder - $JumlahKeluarSekunder, $sPrimer - $JumlahKeluarPrimer);
                    if (
                        ($sTritier - $JumlahKeluarTritier) >= 0 &&
                        ($sSekunder - $JumlahKeluarSekunder) >= 0 &&
                        ($sPrimer - $JumlahKeluarPrimer) >= 0
                    ) {
                        DB::connection('ConnInventory')
                            ->statement('exec [SP_1003_INV_Proses_Acc_Satu_divisi]
                                @IdTransaksi = ?,
                                @User_Acc = ?,
                                @JumlahKeluarPrimer = ?,
                                @JumlahKeluarSekunder = ?,
                                @JumlahKeluarTritier = ?', [
                                $IdTransaksi,
                                $user,
                                $JumlahKeluarPrimer,
                                $JumlahKeluarSekunder,
                                $JumlahKeluarTritier,
                            ]);

                        return response()->json(['success' => 'Data Sudah Disimpan!!..'], 200);
                    } else {
                        return response()->json([
                            'NmError' => 'Untuk Idtransaksi = ' . $IdTransaksi . ' Tidak bisa diacc. Tidak Dapat Diacc !!.  Saldo Tidak Mencukupi'
                        ], 200);
                    }
                } else {
                    return response()->json(['NmError' => 'IdType tidak ditemukan.'], 400);
                }
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diPROSES: ' . $e->getMessage()], 500);
            }
        }


    }

    //Remove the specified resource from storage.
    public function destroy(Request $request)
    {
        // 
    }
}
