import { useState, useRef, useEffect } from 'react'

const GALLERY_DATA = {
  all: [
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178471/IMG_20260104_180211_qu856s.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178470/IMG_20260104_170951_fawbjj.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774177879/IMG_20260104_085406_lxpmfw.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178602/IMG_20260104_090144_qaala3.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178600/IMG_20260104_085020_v87sfb.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178515/IMG_20250610_155004_s3xyrp.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178497/IMG_20260104_085059_nuj6zm.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178486/20260104_092638_tkqwbo.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178484/IMG_20260104_122118_qjbmym.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178477/IMG_20260105_073555_nbejab.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178453/IMG_20260104_120638_d98vv4.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178434/IMG_20260307_145035_vkmcmk.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178433/IMG_20260307_174756_o3ldnz.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178427/IMG_20260308_140020_kgjtlb.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178408/IMG_20260307_150400_szvpsf.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178399/IMG_20260307_174752_fojf2g.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774174669/WhatsApp_Image_2026-03-22_at_3.37.54_PM_1_niovov.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774174651/WhatsApp_Image_2026-03-22_at_3.37.51_PM_1_yv5uac.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774174658/WhatsApp_Image_2026-03-22_at_3.37.51_PM_2_lr8oih.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774174650/WhatsApp_Image_2026-03-22_at_3.37.50_PM_2_pia62q.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774174663/WhatsApp_Image_2026-03-22_at_3.37.52_PM_dvxutl.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774174664/WhatsApp_Image_2026-03-22_at_3.37.53_PM_1_fflxzg.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774174665/WhatsApp_Image_2026-03-22_at_3.37.53_PM_2_lyxxo0.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774174668/WhatsApp_Image_2026-03-22_at_3.37.53_PM_wk52sl.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774174692/WhatsApp_Image_2026-03-22_at_3.38.00_PM_1_to3cys.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774173394/WhatsApp_Image_2026-03-06_at_12.22.20_AM_aflbpk.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774173389/WhatsApp_Image_2026-03-06_at_12.25.31_AM_1_srrkry.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774173358/FLEET_2_a8bsy1.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774173363/WhatsApp_Image_2026-03-06_at_12.21.57_AM_f8jq4k.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774173365/WhatsApp_Image_2026-03-06_at_12.21.58_AM_ur8gjv.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774173375/WhatsApp_Image_2026-03-06_at_12.22.43_AM_1_waxnvy.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774173377/WhatsApp_Image_2026-03-06_at_12.25.15_AM_k5okav.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774171932/WhatsApp_Image_2026-03-06_at_12.25.27_AM_jcaj9b.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774173389/WhatsApp_Image_2026-03-06_at_12.25.08_AM_obptm3.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774174699/WhatsApp_Image_2026-03-22_at_3.38.01_PM_iwnuzg.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774174700/WhatsApp_Image_2026-03-22_at_3.38.02_PM_2_yrraba.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774174701/WhatsApp_Image_2026-03-22_at_3.38.03_PM_pmzr0t.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774174709/WhatsApp_Image_2026-03-22_at_3.38.04_PM_r8pfqb.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774177669/IMG_20260101_190826_tnukll.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774174714/WhatsApp_Image_2026-03-22_at_3.38.06_PM_zji7hd.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774174707/WhatsApp_Image_2026-03-22_at_3.38.04_PM_1_tza0l5.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774174701/WhatsApp_Image_2026-03-22_at_3.38.03_PM_2_yhrway.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774174688/WhatsApp_Image_2026-03-22_at_3.37.59_PM_1_l9grca.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774173664/WhatsApp_Image_2026-03-06_at_12.21.42_AM_v4jxf7.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774177569/IMG_20260105_084355_r8yjoi.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774177786/IMG_20260104_100509_an64rq.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178401/IMG_20260307_131622_u1ezou.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178359/IMG_20260307_181955_nv6i4a.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178349/IMG_20260307_152157_rrq0te.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178354/IMG_20260307_175402_u1lojk.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178338/IMG_20260306_185602_ubgu4s.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178327/IMG_20260306_184822_mjx7io.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178010/IMG_20260104_073629_enezka.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774174660/WhatsApp_Image_2026-03-22_at_3.37.52_PM_1_x0acqd.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774174700/WhatsApp_Image_2026-03-22_at_3.38.03_PM_1_hodtsa.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178502/IMG_20250610_060724_c4asiz.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178513/IMG_20250610_183708_rusvqr.jpg',
  ],
  fleet: [
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774173394/WhatsApp_Image_2026-03-06_at_12.22.20_AM_aflbpk.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774173389/WhatsApp_Image_2026-03-06_at_12.25.31_AM_1_srrkry.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774173358/FLEET_2_a8bsy1.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774173363/WhatsApp_Image_2026-03-06_at_12.21.57_AM_f8jq4k.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774173365/WhatsApp_Image_2026-03-06_at_12.21.58_AM_ur8gjv.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774173375/WhatsApp_Image_2026-03-06_at_12.22.43_AM_1_waxnvy.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774173377/WhatsApp_Image_2026-03-06_at_12.25.15_AM_k5okav.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774171932/WhatsApp_Image_2026-03-06_at_12.25.27_AM_jcaj9b.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774173389/WhatsApp_Image_2026-03-06_at_12.25.08_AM_obptm3.jpg',
  ],
  services: [
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774173704/WhatsApp_Image_2026-03-06_at_12.22.07_AM_utls4w.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774173694/WhatsApp_Image_2026-03-06_at_12.22.01_AM_p12n6s.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774173693/WhatsApp_Image_2026-03-06_at_12.22.00_AM_cfpjyy.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774173688/WhatsApp_Image_2026-03-06_at_12.21.54_AM_gfc816.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774173391/WhatsApp_Image_2026-03-06_at_12.25.32_AM_lxdk0u.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774173394/WhatsApp_Image_2026-03-06_at_12.25.31_AM_kdixct.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774173394/WhatsApp_Image_2026-03-06_at_12.25.31_AM_2_mo0fi8.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774173672/WhatsApp_Image_2026-03-06_at_12.21.47_AM_hja188.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774173686/WhatsApp_Image_2026-03-06_at_12.21.56_AM_hxvxht.jpg',
  ],
  festivals: [
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774174714/WhatsApp_Image_2026-03-22_at_3.38.05_PM_uqq8hq.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774174714/WhatsApp_Image_2026-03-22_at_3.38.06_PM_zji7hd.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774174707/WhatsApp_Image_2026-03-22_at_3.38.04_PM_1_tza0l5.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774174701/WhatsApp_Image_2026-03-22_at_3.38.03_PM_2_yhrway.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774174688/WhatsApp_Image_2026-03-22_at_3.37.59_PM_1_l9grca.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774173664/WhatsApp_Image_2026-03-06_at_12.21.42_AM_v4jxf7.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774173670/WhatsApp_Image_2026-03-06_at_12.21.37_AM_1_dt41ck.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774173672/WhatsApp_Image_2026-03-06_at_12.21.45_AM_l1n3hw.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774173682/WhatsApp_Image_2026-03-06_at_12.21.51_AM_ezdcqm.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774173713/WhatsApp_Image_2026-03-06_at_12.22.31_AM_vfq1s8.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774173718/WhatsApp_Image_2026-03-06_at_12.22.36_AM_uf64sh.jpg',
  ],
  destination: [
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178602/IMG_20260104_090144_qaala3.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178600/IMG_20260104_085020_v87sfb.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178515/IMG_20250610_155004_s3xyrp.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178497/IMG_20260104_085059_nuj6zm.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178486/20260104_092638_tkqwbo.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178484/IMG_20260104_122118_qjbmym.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178477/IMG_20260105_073555_nbejab.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178471/IMG_20260104_180211_qu856s.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178470/IMG_20260104_170951_fawbjj.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178453/IMG_20260104_120638_d98vv4.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178434/IMG_20260307_145035_vkmcmk.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178433/IMG_20260307_174756_o3ldnz.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178427/IMG_20260308_140020_kgjtlb.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178408/IMG_20260307_150400_szvpsf.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178399/IMG_20260307_174752_fojf2g.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178362/IMG_20260307_130636_vt2the.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178359/IMG_20260307_181955_nv6i4a.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178349/IMG_20260307_152157_rrq0te.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178354/IMG_20260307_175402_u1lojk.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178338/IMG_20260306_185602_ubgu4s.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178327/IMG_20260306_184822_mjx7io.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774178010/IMG_20260104_073629_enezka.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774177669/IMG_20260101_190826_tnukll.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774177786/IMG_20260104_100509_an64rq.jpg',
  ],
  staff: [
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774174650/WhatsApp_Image_2026-03-22_at_3.37.50_PM_1_dklhsm.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774174651/WhatsApp_Image_2026-03-22_at_3.37.50_PM_joq0ac.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774173722/WhatsApp_Image_2026-03-06_at_12.22.29_AM_jg2d1a.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774173717/WhatsApp_Image_2026-03-06_at_12.22.39_AM_1_cmrksy.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774173672/WhatsApp_Image_2026-03-06_at_12.21.45_AM_l1n3hw.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774173722/WhatsApp_Image_2026-03-06_at_12.22.42_AM_buwelw.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774173722/WhatsApp_Image_2026-03-06_at_12.22.41_AM_1_hyoec7.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774174714/WhatsApp_Image_2026-03-22_at_3.38.05_PM_uqq8hq.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774181421/WhatsApp_Image_2026-03-22_at_5.29.15_PM_rgaliv.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774181420/WhatsApp_Image_2026-03-22_at_5.27.48_PM_mivzwt.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774181417/WhatsApp_Image_2026-03-22_at_5.30.26_PM_kegtbh.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774181380/WhatsApp_Image_2026-03-22_at_5.24.57_PM_ez4tbo.jpg',
    'https://res.cloudinary.com/dzadpggxn/image/upload/q_auto,f_auto,w_800/v1774181377/WhatsApp_Image_2026-03-22_at_5.24.56_PM_xrgmou.jpg',
  ],
}

const SECTIONS = [
  { key: 'all', label: '✦ All Memories' },
  { key: 'fleet', label: '🚌 Fleet' },
  { key: 'services', label: '🗺 Services' },
  { key: 'destination', label: '📍 Destinations' },
  { key: 'festivals', label: '🎉 Festivals' },
  { key: 'staff', label: '👥 Team' },
]

function MasonryGrid({ imgs, onImgClick, sectionLabel }) {
  return (
    <div style={{
      columnCount: 'auto',
      columnWidth: '280px',
      columnGap: '12px',
      padding: '0 12px',
    }}>
      {imgs.map((src, i) => (
        <div
          key={i}
          onClick={() => onImgClick({ thumb: src, full: src.replace(',w_800', '').replace('w_800', '') })}
          style={{
            breakInside: 'avoid',
            marginBottom: '12px',
            borderRadius: '10px',
            overflow: 'hidden',
            cursor: 'pointer',
            position: 'relative',
          }}
          className="g-masonry-img"
        >
          <img
            src={src}
            alt={`SR Travels — $${sectionLabel} photo ${i + 1}`}
            loading="lazy"
            style={{
              width: '100%',
              display: 'block',
              borderRadius: '10px',
              objectFit: 'cover',
              transition: 'transform 0.4s ease',
            }}
          />
        </div>
      ))}
    </div>
  )
}

export default function Galleria() {
  const [activeSection, setActiveSection] = useState('all')
  const [lb, setLb] = useState(null)
  const [lbLoaded, setLbLoaded] = useState(false)

  const visibleSections = activeSection === 'all'
    ? SECTIONS.filter(s => s.key !== 'all')
    : SECTIONS.filter(s => s.key === activeSection)

  // Reset load status
  useEffect(() => {
    if (lb) setLbLoaded(false)
  }, [lb])

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') setLb(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <style>{`
        .g-masonry-img:hover img { transform: scale(1.04); }
        .g-sticky-tabs {
          position: sticky; top: 0; z-index: 100; background: var(--bg-darkest);
          padding: 0 2rem;
          display: flex; gap: 0.5rem; overflow-x: auto;
          scrollbar-width: none; border-bottom: 1px solid rgba(255,255,255,0.06);
          align-items: center;
        }
        .g-sticky-tabs::-webkit-scrollbar { display: none; }
        .g-section-tab {
          padding: 1rem 1.2rem; font-size: 0.7rem; text-transform: uppercase;
          letter-spacing: 0.12em; border: none; background: transparent;
          color: rgba(255,255,255,0.45); cursor: pointer; white-space: nowrap;
          border-bottom: 2px solid transparent; transition: all 0.3s;
          font-family: 'DM Sans', sans-serif; flex-shrink: 0;
        }
        .g-section-tab.active { color: var(--accent); border-bottom-color: var(--accent); }
        .g-section-tab:hover { color: rgba(255,255,255,0.8); }
        .g-section-label {
          font-family: 'Cormorant Garamond', serif; font-size: clamp(1.6rem, 3vw, 2.4rem);
          font-weight: 300; color: var(--text); margin: 3rem 0 1.5rem 2rem;
          padding-bottom: 0.8rem; border-bottom: 1px solid var(--border);
        }
        @media (max-width: 768px) {
          .g-close-btn { 
            right: auto !important;
            left: 1.4rem !important;
          }
        }
        @keyframes lbIn { from { opacity:0; transform:scale(0.9); } to { opacity:1; transform:scale(1); } }
        @keyframes g-spin { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
      `}</style>

      <div id="galleria" style={{ minHeight: '100vh', background: 'var(--bg-darkest)', paddingBottom: '4rem' }}>

        {/* Page header */}
        <div style={{ padding: '5rem 2rem 1.5rem', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="section-label" style={{ color: 'rgba(255,255,255,0.5)' }}>Our Memories</span>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.5rem,5vw,4rem)', fontWeight: 300, color: '#fff', letterSpacing: '0.01em' }}>
              <em>Galleria</em>
            </h1>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.45)', maxWidth: '340px', textAlign: 'right', lineHeight: 1.7 }}>
            Moments captured across trips, our fleet, team, and destination highlights.
          </p>
        </div>

        {/* Sticky tab bar */}
        <div className="g-sticky-tabs">
          {SECTIONS.map(s => (
            <button
              key={s.key}
              className={`g-section-tab ${activeSection === s.key ? 'active' : ''}`}
              onClick={() => setActiveSection(s.key)}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Dynamic sections */}
        {activeSection === 'all' ? (
          <div>
            <MasonryGrid imgs={GALLERY_DATA.all} onImgClick={setLb} />
          </div>
        ) : (
          visibleSections.map(section => {
            const imgs = GALLERY_DATA[section.key] || []
            if (!imgs.length) return null
            return (
              <div key={section.key}>
                <h2 className="g-section-label">{section.label}</h2>
                <MasonryGrid imgs={imgs} onImgClick={setLb} sectionLabel={section.label} />
              </div>
            )
          })
        )}
      </div>

      {/* Lightbox modal */}
      {lb && (
        <div
          onClick={() => setLb(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 10001,
            background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1.5rem',
          }}
        >
          {/* Close button */}
          <button className="g-close-btn" onClick={() => setLb(null)} style={{
            position: 'fixed', top: '1.2rem', right: '1.4rem', zIndex: 20,
            width: 40, height: 40, borderRadius: '50%',
            background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(6px)',
            border: '1px solid rgba(255,255,255,0.2)',
            color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
          }}>✕</button>

          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={e => e.stopPropagation()}>
            {/* Low res placeholder */}
            <img
              src={lb.thumb}
              alt=""
              style={{
                maxWidth: '90vw', maxHeight: '88vh', borderRadius: 8,
                objectFit: 'contain', filter: 'blur(10px)', opacity: lbLoaded ? 0 : 0.6,
                position: 'absolute', transition: 'opacity 0.4s ease'
              }}
            />

            {/* Loading spinner */}
            {!lbLoaded && (
              <div style={{
                position: 'absolute', width: 32, height: 32,
                border: '2px solid rgba(255,255,255,0.1)', borderTopColor: 'var(--accent)',
                borderRadius: '50%', animation: 'g-spin 0.8s linear infinite'
              }} />
            )}

            {/* Full res image */}
            <img
              src={lb.full}
              onLoad={() => setLbLoaded(true)}
              onError={(e) => {
                if (e.target.src !== lb.thumb) {
                  e.target.src = lb.thumb;
                }
                setLbLoaded(true);
              }}
              alt="Gallery fullscreen"
              style={{
                maxWidth: '90vw', maxHeight: '88vh', borderRadius: 8,
                objectFit: 'contain', boxShadow: '0 24px 80px rgba(0,0,0,0.7)',
                position: 'relative', zIndex: 2, opacity: lbLoaded ? 1 : 0,
                transition: 'opacity 0.4s ease',
                animation: 'lbIn 0.28s cubic-bezier(0.22,1,0.36,1)',
              }}
            />
          </div>
        </div>
      )}
    </>
  )
}
