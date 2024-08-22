<?php

namespace App\Http\Controllers\Inventory\Master;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HakAksesController;

class MaintenanceTypeController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Inventory'); //tidak perlu menu di navbar
        return view('Inventory.Master.MaintenanceType', compact('access'));
    }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        $data = $request->all();
        // dd($data , " Masuk store");
        DB::connection('ConnInventory')->statement('exec SP_1003_INV_insert_type @XIdType = ?, @XNamaType = ?, @XUraianType = ?
        , @XIdSubkelompok_Type = ?, @XKodeBarang = ?, @XSaatStokAwal = ?, @XStokAwalPrimer = ?, @XTotalPemasukanPrimer = ?, @XSaldoPrimer = ?, @XUnitPrimer = ?, @XStokAwalSekunder = ?, XTotalPemasukanSekunder = ?
        , @XSaldoSekunder = ?, @XUnitSekunder = ?, @XStokAwalTritier = ?, @XTotalPemasukanTritier = ?, @XSaldoTritier = ?, @XUnitTritier = ?, @XPakaiAturanKonversi = ?, @XKonvSekunderKePrimer = ?, @XKonvTritierKeSekunder = ?
        , @XNonaktif = ?, @XMinimumStok = ?, @XNo_satuan_umum = ?, @userInput = ?', [
            $data['IdType'],
            $data['NamaType'],
            $data['UraianType'],
            $data['IdSubKel'],
            $data['KodeBarang'],
            $data['SaatStokAwal'],
            $data['StokAwalPrimer'],
            $data['TotalPemasukanPrimer'],
            $data['SaldoPrimer'],
            $data['UnitPrimer'],
            $data['StokAwalSekunder'],
            $data['TotalPemasukanSekunder'],
            $data['SaldoSekunder'],
            $data['UnitSekunder'],
            $data['StokAwalTritier'],
            $data['TotalPemasukanTritier'],
            $data['SaldoTritier'],
            $data['UnitTritier'],
            $data['AturanKonversi'],
            $data['KonvSekunderPrimer'],
            $data['KonvTritierSekunder'],
            $data['NonAktif'],
            $data['MinimumStok'],
            $data['NoSatuanUmum'],
            $data['userInput']
        ]);

        return redirect()->route('MaintenanceType.index')->with('alert', 'Data berhasil ditambahkan!');
    }

    //Display the specified resource.
    public function show($id, Request $request)
    {
        $user = Auth::user()->NomorUser;
        $a = (int)$request->input('a');
        $namaType = $request->input('namaType');
        $ketType = $request->input('ketType');
        $PIB = $request->input('PIB');
        $PEB = $request->input('PEB');
        $kdBarang = $request->input('kdBarang');
        $subkelId = $request->input('subkelId');
        $konversi = $request->input('konversi');
        $divisiId = $request->input('divisiId');
        $divisiNama = $request->input('divisiNama');
        $objekId = $request->input('objekId');
        $objekNama = $request->input('objekNama');
        $kelompokId = $request->input('kelompokId');
        $kelompokNama = $request->input('kelompokNama');
        $kelutId = $request->input('kelutId');
        $kelutNama = $request->input('kelutNama');
        $subkelNama = $request->input('subkelNama');
        $katUtama = $request->input('katUtama');
        $kategori = $request->input('kategori');
        $jenis = $request->input('jenis');
        $namaBarang = $request->input('namaBarang');
        $kodeType = $request->input('kodeType');
        $triter = $request->input('triter');
        $sekunder = $request->input('sekunder');
        $primer = $request->input('primer');
        $satuan = $request->input('satuan');
        $primerSekunder = $request->input('primerSekunder');
        $sekunderTritier = $request->input('sekunderTritier');

        $no_tritier = $request->input('no_tritier');
        $no_sekunder = $request->input('no_sekunder');
        $no_primer = $request->input('no_primer');

        $no_katUtama = $request->input('no_katUtama');
        $no_kategori = $request->input('no_kategori');
        $no_subkategori = $request->input('no_subkategori');


        // mendapatkan daftar divisi
        if ($id === 'getDivisi') {
            $divisi = DB::connection('ConnInventory')->select('exec SP_1003_INV_userdivisi @XKdUser = ?', [$user]);
            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'NamaDivisi' => $detail_divisi->NamaDivisi,
                    'IdDivisi' => $detail_divisi->IdDivisi
                ];
            }
            return datatables($divisi)->make(true);

            // mendapatkan daftar objek
        } else if ($id === 'getObjek') {
            $objek = DB::connection('ConnInventory')->select('exec SP_1003_INV_User_Objek @XKdUser = ?, @XIdDivisi = ?', [$user, $divisiId]);
            $data_objek = [];
            foreach ($objek as $detail_objek) {
                $data_objek[] = [
                    'NamaObjek' => $detail_objek->NamaObjek,
                    'IdObjek' => $detail_objek->IdObjek
                ];
            }
            return datatables($objek)->make(true);

            // mendapatkan daftar kelompok utama
        } else if ($id === 'getKelUt') {
            $kelut = DB::connection('ConnInventory')->select('exec SP_1003_INV_IdObjek_KelompokUtama @XIdObjek_KelompokUtama = ?', [$objekId]);
            $data_kelut = [];
            foreach ($kelut as $detail_kelut) {
                $data_kelut[] = [
                    'NamaKelompokUtama' => $detail_kelut->NamaKelompokUtama,
                    'IdKelompokUtama' => $detail_kelut->IdKelompokUtama
                ];
            }
            return datatables($kelut)->make(true);

            // mendapatkan daftar kelompok
        } else if ($id === 'getKelompok') {
            $kelompok = DB::connection('ConnInventory')->select('exec SP_1003_INV_IdKelompokUtama_Kelompok @XIdKelompokUtama_Kelompok = ?', [$kelutId]);
            $data_kelompok = [];
            foreach ($kelompok as $detail_kelompok) {
                $data_kelompok[] = [
                    'idkelompok' => $detail_kelompok->idkelompok,
                    'namakelompok' => $detail_kelompok->namakelompok
                ];
            }
            return datatables($kelompok)->make(true);

            // mendapatkan daftar sub kelompok
        } else if ($id === 'getSubkel') {
            $subkel = DB::connection('ConnInventory')->select('exec SP_1003_INV_IDKELOMPOK_SUBKELOMPOK @XIdKelompok_SubKelompok = ?', [$kelompokId]);
            $data_subkel = [];
            foreach ($subkel as $detail_subkel) {
                $data_subkel[] = [
                    'IdSubkelompok' => $detail_subkel->IdSubkelompok,
                    'NamaSubKelompok' => $detail_subkel->NamaSubKelompok
                ];
            }
            return datatables($subkel)->make(true);

            // mendapatkan daftar kategori utama
        } else if ($id === 'getKatut') {
            $katUtama = DB::connection('ConnPurchase')->select('exec SP_1003_INV_mohon_beli @MyType = 1');
            $data_katUtama = [];
            foreach ($katUtama as $detail_katUtama) {
                $data_katUtama[] = [
                    'no_kat_utama' => $detail_katUtama->no_kat_utama,
                    'nama' => $detail_katUtama->nama
                ];
            }
            return datatables($katUtama)->make(true);

            // mendapatkan daftar kategori
        } else if ($id === 'getKategori') {
            $kategori = DB::connection('ConnPurchase')->select('exec SP_1003_INV_mohon_beli @MyType = 2, @MyValue = ?', [$no_katUtama]);
            $data_kategori = [];
            foreach ($kategori as $detail_kategori) {
                $data_kategori[] = [
                    'no_kategori' => $detail_kategori->no_kategori,
                    'nama_kategori' => $detail_kategori->nama_kategori
                ];
            }
            return datatables($kategori)->make(true);

            // mendapatkan daftar sub kategori
        } else if ($id === 'getSubkategori') {
            $subKategori = DB::connection('ConnPurchase')->select('exec SP_1003_INV_mohon_beli @MyType = 3, @MyValue = ?', [$no_kategori]);
            $data_subKategori = [];
            foreach ($subKategori as $detail_subKategori) {
                $data_subKategori[] = [
                    'no_sub_kategori' => $detail_subKategori->no_sub_kategori,
                    'nama_sub_kategori' => $detail_subKategori->nama_sub_kategori
                ];
            }
            return datatables($subKategori)->make(true);

            // mendapatkan daftar barang
        } else if ($id === 'getBarang') {
            // mendapatkan barang
            $barang = DB::connection('ConnPurchase')->select('exec SP_1003_INV_lihat_type @no_jns_1 = ?', [$no_subkategori]);
            $data_barang = [];
            foreach ($barang as $detail_barang) {
                $data_barang[] = [
                    'KD_BRG' => $detail_barang->KD_BRG,
                    'NAMA_BRG' => $detail_barang->NAMA_BRG
                ];
            }
            return datatables($data_barang)->make(true);

            // auto fill satuan primer, sekunder, tritier dr kode barang
        } else if ($id === 'getFillSatuan') {
            // Fetch unit information from the database
            $satuanBarang = DB::connection('ConnPurchase')->select('exec SP_1003_INV_KdBrg_Satuan_YBarang @kodebarang = ?', [$kdBarang]);

            // Prepare the response data
            $data_satuanBarang = [];
            foreach ($satuanBarang as $detail_satuanBarang) {
                $data_satuanBarang[] = [
                    'NmSat_Tri' => $detail_satuanBarang->NmSat_Tri,
                    'NmSat_Sek' => $detail_satuanBarang->NmSat_Sek,
                    'NmSat_Prim' => $detail_satuanBarang->NmSat_Prim
                ];
            }

            // Return the data as a JSON response
            return response()->json($data_satuanBarang);
            // return response()->json($dataDetailNoRoll);


            // mendapatkan satuan primer, sekunder, tritier
        } else if ($id === 'getSatuan') {
            $satuan = DB::connection('ConnInventory')->select('exec SP_1003_INV_list_satuan');
            $data_satuan = [];
            foreach ($satuan as $detail_satuan) {
                $data_satuan[] = [
                    'no_satuan' => $detail_satuan->no_satuan,
                    'nama_satuan' => $detail_satuan->nama_satuan
                ];
            }
            return datatables($satuan)->make(true);

            // proses terjadi
        } else if ($id === 'proses') {
            if ($a === 1) {
                // cek id kode barang
                $cekKodeBarang = DB::connection('ConnInventory')->select(
                    'exec SP_1003_INV_CheckKodeBarang_Typ
                    @kd = 1, @noPIB = ?, @XKodebarang = ?, @XIdSubKelompok = ?',
                    [$request->input('PIB'), $kdBarang, $subkelId]
                );

                if (!empty($cekKodeBarang)) {
                    return response()->json(['error'], 200);
                } else {
                    // cek counter
                    $cekTabel = DB::connection('ConnInventory')->select('exec SP_1003_INV_List_Counter');
                    if (!empty($cekTabel)) {
                        $idtype = $cekTabel[0]->IdType + 1;
                    }
                    $idtype = str_pad($idtype, 20, '0', STR_PAD_LEFT);

                    DB::connection('ConnInventory')->statement(
                        'exec SP_1003_INV_insert_type
                            @XIdType = ?, @XNamaType = ?, @XUraianType = ?, @XIdSubKelompok_Type = ?, @XKodeBarang = ?,
                            @XSaatStokAwal = ?, @XStokAwalPrimer = ?, @XTotalPemasukanPrimer = ?, @XSaldoPrimer = ?, @XUnitPrimer = ?,
                            @XStokAwalSekunder = ?, @XTotalPemasukanSekunder = ?, @XSaldoSekunder = ?, @XUnitSekunder = ?,
                            @XStokAwalTritier = ?, @XTotalPemasukanTritier = ?, @XSaldoTritier = ?, @XUnitTritier = ?,
                            @XPakaiAturanKonversi = ?, @XKonvSekunderKePrimer = ?, @XKonvTritierkeSekunder = ?, @XNonaktif = ?,
                            @XMinimumStok = ?, @Xno_satuan_umum = ?, @userInput = ?, @noPIB = ?, @noPEB = ?',
                        [
                            $idtype, $namaType, $ketType, $subkelId, $kdBarang,
                            now(), 0,0,0, $no_primer,
                            0,0,0, $no_sekunder,
                            0,0,0, $no_tritier,
                            $konversi, $primerSekunder, $sekunderTritier, "Y",
                            0, $satuan, $user, $PIB, $PEB
                        ]
                    );
                    return response()->json(['success'], 200);
                }
            }
        }
    }

    // Show the form for editing the specified resource.
    public function edit($id)
    {
        //
    }

    //Update the specified resource in storage.
    public function update(Request $request)
    {
        $data = $request->all();
        // dd($data , " Masuk update");
        DB::connection('ConnInventory')->statement('exec SP_1003_INV_update_type @XIdType = ?, @XNamaType = ?, @XUraianType = ?
        , @XIdSubkelompok_Type = ?, @XKodeBarang = ?, @XUnitPrimer = ?, @XUnitSekunder = ?, @XUnitTritier = ?, @XPakaiAturanKonversi = ?, @XKonvSekunderKePrimer = ?, @XKonvTritierKeSekunder = ?,
        @XNo_satuan_umum = ?', [
            $data['IdType'],
            $data['NamaType'],
            $data['UraianType'],
            $data['IdSubKel'],
            $data['KodeBarang'],
            $data['UnitPrimer'],
            $data['UnitSekunder'],
            $data['UnitTritier'],
            $data['AturanKonversi'],
            $data['KonvSekunderPrimer'],
            $data['KonvTritierSekunder'],
            $data['NoSatuanUmum']
        ]);
        return redirect()->route('MaintenanceType.index')->with('alert', 'Data berhasil diupdate!');
    }

    //Remove the specified resource from storage.
    public function destroy(Request $request)
    {
        $data = $request->all();
        // dd('Masuk Destroy', $data);
        DB::connection('ConnInventory')->statement('exec SP_1003_INV_delete_type  @XIdType = ?', [
            $data['IdType']
        ]);

        return redirect()->route('MaintenanceType.index')->with('alert', 'Data berhasil dihapus!');
    }
}
