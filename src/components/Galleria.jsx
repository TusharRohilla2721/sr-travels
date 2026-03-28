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

const TABS = ['all', 'fleet', 'services', 'festivals', 'destination', 'staff']
const WIDTHS = ['12%', '19%', '15%', '22%', '16%', '16%']
const RATIOS = ['2/3', '4/5', '1/1', '3/4', '4/5', '2/3']
const SPEEDS = [24, 19, 22, 17, 25, 20]
const DIRS = ['gdn', 'gup', 'gdn', 'gup', 'gdn', 'gup']

function buildStrip(imgs) {
  const unique = [...new Set(imgs)].slice(0, 20)
  const set = Array.from({ length: 20 }, (_, j) => unique[j % unique.length])
  return [...set, ...set]
}



// ─── Mobile marquee — pure JS rAF so the loop distance is always exact ─────
// WHY NOT CSS animation?
//   translateX(-50%) resolves against the element's OWN width.
//   Inside a flex/overflow:hidden parent, mobile WebKit frequently resolves
//   that width as the parent's width (or 0), making -50% the wrong shift.
//   loading="lazy" also makes scrollWidth wrong at animation-start time.
//   rAF reads scrollWidth AFTER real layout — always correct on every device.
function MobileMarquee({ imgs }) {
  const trackRef = useRef(null)
  const rafRef = useRef(null)
  const offsetRef = useRef(0)
  const halfRef = useRef(0)
  const pausedRef = useRef(false)

  useEffect(() => {
    const el = trackRef.current
    if (!el) return

    // Cancel any existing loop before starting a new one
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    offsetRef.current = 0

    const loop = () => {
      if (!pausedRef.current) {
        offsetRef.current += 0.55           // ~33 px/s at 60 fps — readable pace
        if (halfRef.current > 0 && offsetRef.current >= halfRef.current) {
          offsetRef.current = 0             // snap back — second copy = first copy
        }
        if (el) el.style.transform = `translateX(-${offsetRef.current}px)`
      }
      rafRef.current = requestAnimationFrame(loop)
    }

    // Wait one rAF after mount so the browser has laid out all images
    // (even without lazy, first rAF is safer than measuring synchronously)
    rafRef.current = requestAnimationFrame(() => {
      halfRef.current = el.scrollWidth / 2  // true half width after layout
      loop()
    })

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [imgs])   // restart when category changes (key prop on MobileMarquee handles remount)

  return (
    // Clip container: plain block — NOT display:flex on this element
    // so the inner track's inline-flex width is not constrained by flex logic
    <div
      style={{
        flex: 1,
        minHeight: 0,
        overflow: 'hidden',
        position: 'relative',
        display: 'block',         // ← block, not flex
      }}
    >
      {/* Vertical centering wrapper */}
      <div style={{
        position: 'absolute',
        top: 0, bottom: 0, left: 0,
        display: 'flex',
        alignItems: 'center',
      }}>
        {/* Animated track — inline-flex so scrollWidth = true content width */}
        <div
          ref={trackRef}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.65rem',
            padding: '0 0.5rem',
            willChange: 'transform',  // hint GPU compositing; safe on the leaf element
            flexShrink: 0,
          }}
        >
          {/* Double the array — when offset reaches halfRef, reset to 0 seamlessly */}
          {[...imgs, ...imgs].map((src, i) => (
            <img
              key={i}
              src={src}
              alt="SR Travels Gallery"
              // ✅ No loading="lazy" — we need real dimensions immediately for scrollWidth
              style={{
                height: '42vh',
                width: 'auto',
                aspectRatio: '3/4',
                objectFit: 'cover',
                objectPosition: 'center top',
                borderRadius: 10,
                flexShrink: 0,
                display: 'block',
                boxShadow: '0 6px 20px rgba(0,0,0,0.5)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Galleria() {
  const [cat, setCat] = useState('all')
  const [dissolve, setDissolve] = useState(false)
  const [imgs, setImgs] = useState(() => buildStrip(GALLERY_DATA.all))
  const [lb, setLb] = useState(null)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768)
  const stripsRef = useRef(null)
  const wrapRef = useRef(null)

  // Reactive width check — responds correctly to window resize
  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const changeCat = (next) => {
    if (next === cat) return
    setDissolve(true)
    setTimeout(() => {
      setImgs(buildStrip(GALLERY_DATA[next] || GALLERY_DATA.all))
      setCat(next)
      setTimeout(() => setDissolve(false), 50)
    }, 280)
  }

  // Desktop tilt — skip on mobile
  useEffect(() => {
    if (isMobile) return
    const wrap = wrapRef.current
    const strips = stripsRef.current
    if (!wrap || !strips) return
    const onMove = e => {
      const r = wrap.getBoundingClientRect()
      const nx = (e.clientX - r.left) / r.width - 0.5
      const ny = (e.clientY - r.top) / r.height - 0.5
      strips.style.transform = `rotateX(${ny * -6}deg) rotateY(${nx * 6}deg)`
    }
    const onLeave = () => { strips.style.transform = 'rotateX(0deg) rotateY(0deg)' }
    wrap.addEventListener('mousemove', onMove)
    wrap.addEventListener('mouseleave', onLeave)
    return () => {
      wrap.removeEventListener('mousemove', onMove)
      wrap.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') setLb(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Flat list for mobile (MobileMarquee doubles it internally)
  const flatImgs = GALLERY_DATA[cat] || GALLERY_DATA.all

  return (
    <>
      {/*
        Keyframes for DESKTOP strips.
        gdn/gup are also in global.css — duplicate is harmless,
        ensures they're parsed before the component's animation starts.
        DO NOT add @keyframes to CSS that also sets will-change on the
        same element — keep them separate.
      */}
      <style>{`
        @keyframes gdn  { from { transform: translateY(-50%); } to { transform: translateY(0%);   } }
        @keyframes gup  { from { transform: translateY(0%);   } to { transform: translateY(-50%); } }
        @keyframes lbIn { from { opacity:0; transform:scale(0.9); } to { opacity:1; transform:scale(1); } }

        .gin-dissolve { opacity:0 !important; transition: opacity 0.28s !important; }
        .gin-show     { opacity:1 !important; transition: opacity 0.32s !important; }

        @media (hover: hover) and (pointer: fine) {
          .gin-wrap:hover .gin { animation-play-state: paused !important; }
        }
      `}</style>

      <section
        id="galleria"
        style={{
          height: '100vh',
          background: 'var(--bg-darkest)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          transition: 'background 0.4s',
        }}
      >
        {/* ── Header / tabs ── */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '1.6rem 3rem',
          background: 'linear-gradient(to bottom, rgba(10,9,8,0.88) 0%, transparent 100%)',
          pointerEvents: 'none',
        }}>
          <h2 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(1.4rem,2vw,1.9rem)',
            fontWeight: 300, color: 'rgba(255,255,255,0.9)',
            letterSpacing: '0.02em', pointerEvents: 'auto',
          }}>
            <em>Galleria</em> — SR Travels
          </h2>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', pointerEvents: 'auto' }}>
            {TABS.map(t => (
              <button key={t} onClick={() => changeCat(t)} style={{
                padding: '0.32rem 0.85rem',
                border: `1px solid ${t === cat ? 'var(--accent)' : 'rgba(255,255,255,0.15)'}`,
                background: t === cat ? 'var(--accent)' : 'rgba(0,0,0,0.35)',
                color: t === cat ? '#fff' : 'rgba(255,255,255,0.5)',
                fontSize: '0.63rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                cursor: 'none', borderRadius: 20, backdropFilter: 'blur(8px)',
                transition: 'all 0.3s', fontFamily: 'DM Sans, sans-serif',
              }}>{t}</button>
            ))}
          </div>
        </div>

        {/* ═══ DESKTOP — 6 vertical CSS-animated strips ════════════════════
            KEY RULE: the wrapRef and stripsRef divs must NOT have
            will-change:transform or translateZ() on them — those properties
            create a new GPU compositing layer that BREAKS child CSS keyframe
            animations (they reset mid-loop on layer promotion).
            Only the .gin leaf elements (the animated ones) carry transform.
        ═══════════════════════════════════════════════════════════════════ */}
        <div
          ref={wrapRef}
          style={{
            flex: 1, minHeight: 0,
            perspective: '900px', perspectiveOrigin: '50% 50%',
            padding: '20px', overflow: 'hidden',
            display: isMobile ? 'none' : 'flex',   // hide on mobile, show on desktop
          }}
        >
          <div
            ref={stripsRef}
            style={{
              display: 'flex', width: '100%', height: '100%', gap: '20px',
              transformStyle: 'preserve-3d',
              transition: 'transform 0.14s ease-out',
              // ✅ NO will-change here — it breaks child keyframe animations
            }}
          >
            {WIDTHS.map((w, si) => (
              <div key={si} className="gin-wrap" style={{
                overflow: 'hidden', height: '100%', borderRadius: 8,
                flexShrink: 0, width: w, position: 'relative',
              }}>
                <div
                  className={`gin ${dissolve ? 'gin-dissolve' : 'gin-show'}`}
                  style={{
                    display: 'flex', flexDirection: 'column', gap: '20px',
                    animationName: DIRS[si],
                    animationDuration: `${SPEEDS[si]}s`,
                    animationTimingFunction: 'linear',
                    animationIterationCount: 'infinite',
                    // ✅ translateZ on the LEAF animated element is fine — promotes
                    //    only this element, not the parent layer
                    transform: 'translateZ(0)',
                  }}
                >
                  {imgs.map((src, ii) => (
                    <img
                      key={ii}
                      src={src}
                      alt="SR Travels Gallery"
                      loading="lazy"
                      onClick={() => setLb(src.replace('w_800', 'w_1600'))}
                      style={{
                        width: '100%', objectFit: 'cover', borderRadius: 6,
                        flexShrink: 0, display: 'block', aspectRatio: RATIOS[si],
                        border: '1px solid rgba(255,255,255,0.04)',
                        cursor: 'none', transition: 'opacity 0.2s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.opacity = '0.8' }}
                      onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══ MOBILE — JS rAF marquee ════════════════════════════════════
            key={cat} forces a full remount (and rAF restart) on category change
        ═══════════════════════════════════════════════════════════════════ */}
        {isMobile && <MobileMarquee imgs={flatImgs} key={cat} />}
      </section>

      {/* ── Lightbox ── */}
      {lb && (
        <div
          onClick={() => setLb(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 9990,
            background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1.5rem',
          }}
        >
          <button onClick={() => setLb(null)} style={{
            position: 'fixed', top: '1.2rem', right: '1.4rem', zIndex: 3,
            width: 40, height: 40, borderRadius: '50%',
            background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(6px)',
            border: '1px solid rgba(255,255,255,0.2)',
            color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'none',
          }}>✕</button>
          <img
            src={lb}
            alt="Gallery fullscreen"
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: '90vw', maxHeight: '88vh', borderRadius: 8,
              objectFit: 'contain', boxShadow: '0 24px 80px rgba(0,0,0,0.7)',
              position: 'relative', zIndex: 2,
              animation: 'lbIn 0.28s cubic-bezier(0.22,1,0.36,1)',
            }}
          />
        </div>
      )}
    </>
  )
}