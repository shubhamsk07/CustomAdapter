import { BaseWalletAdapter, WalletName, WalletReadyState } from "@solana/wallet-adapter-base";
import { PublicKey, Transaction, TransactionVersion, Keypair } from "@solana/web3.js";

export class SimpleWalletAdapter extends BaseWalletAdapter {
  name = "Ace" as WalletName; // Adjust according to your WalletName enum
  url = "https://dcex-xi.vercel.app";
  icon =
    "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAHsAAACBCAYAAADgzsUAAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAB7OSURBVHhe7Z17vCVVded/az+q6rzuvf2gQXmoSGYiGPE10fEzijhiMIqIoeEjyFMQwaAyGo3Rjz3qJPpRcYIoSFBU1HymaRUQUNRohvGjSUh0TEbRGJOAbxq67+17z6nn3nvNH7vqnHOrT/ft2/fZcL792V3nnqpdp6pWrbXXXvsFjBkzZsyYMWPGjBkzZsyYMWPGjBkzZsyYMWPWLwyqfzXmwFn3D2/rtq3B7g3RJQXl/1lJFXe7vV+1Wu2ftXTjl5mzvxKku02muNvr9qYel6U7ztph6+cY41n3wn7xtRf/AbfEDa6BTRkXkIEEESGL8z1SyD1aBXNc2G6g1VyWmt15kvy63Wjf7xz/XDn8ImhGD6dxd1YZ3bvzsr+I6+d/NLGuhf2KT7zx2Dk3twMd8XQTORhlUcDA5AUAgUYQwjmHPC0QBgFggSAIIEki7nZjLXWsgzBN4ySNRBirbhHb1O2JonBnkec/cg7/vKEz+UvW+uHudG93c/OW3o6z3pXXr+ORwvoVNoOe/5Hzrm48ZuKq3cUMuEUokKGAgZQSYdgArIPJCwghoKQEO6A7O4tGo4EwDFGkBkIICCFgM4NJ3YFNCzjn4JyDlgHgMAfmXtRq97K53myr2Z7JsvSXSukHJOjfHOHf0zj+eTSx8cEwv79vGXZs3eFA4PkXvb5Zt8I+/YbLn5N0zK08IbfsymcQdALkNgOTAzOBiJCnGYgIjUYDJsshpYSUEkQSWZahKL/TWkNAAM5BiwAAYIxDpAMURYE0SdBuTcAag1arhV07H0Kr1UEQBIjTOI2CZpymSU9TmAhBPcpFTxjzsDDul8LyTxXTfQLBAzLAdJG47notLtalsM+47rVb4rbZwZP6eQ8XMwinAuzeM41AKmitYa2FUgpEXuhCCMTdHogIWmskWYYgCNDpdJAkCdI0RbvdQpylYHIgIljDCMMQUkpkaQqCgCQCMyMKQhTFwM+z1kJrDWcYYAHFEi4v0AmbsHkBZSUTia4tTBIU4tcRNbbddsG1t8+7qXWArH+xHnjiWc/873mDX5noAhwy4jxB1AwhWCAMQ9jCAQQIIZDnvojVQQASAkJKSK1BQiBJUzhmhFGEzBSAAlgwdBTAkUWSZWBikCQ4chCSYNiAiZDbHCQJxhlILVG4AiwBFg6OLEQkkLgcTjFy6SgXRWgUWjLUR6Rsfve3f+937/3pHf/wi/q9rSXrTrNfdO2Fp9Bjwu1dkW3IwgKZy9BsBuh2Y2gVARAQLODI1bOCa3fjSi0u94LYgkaUsmLEd6g9HAbg9npaoiy0CYCAJAWXOGxUE8Cc+4adFq+65w+v+00911qxrjT75dec/8TO47bcOIO5J8xRClaAhYEWBGKCIAEGgfsSc/5zlcBwxOAyAQwILwsCIJggmEEQIAxv/f69Eg8+gwABBwEGEYPBYAKsYDjBcAJgATAzmB1cbo/d0GhMv/J3Tv32Pffcs4/XaXUR9S/WDAblHf3OXfmup8YugQgAGRCEAExuS+3j8oFbgCxAXAqrFCxZCAwnByqTQGUJSukPbbmWvNTmf0cMKAco58otINlBsj8/4FCY3F93SAhaEhyaN373mJ3PnX+ja8e60ezTjnr1K+LI/HGq89A1CIUwKIoMkgQEBKSQYAZAvsZTT96gjtjH5YsAAs17NYa25IuAKlWaXFdzwQxRlhVEAFiAiOHI60yr2USv2wMbX1yYomi1mo0nPe4FJ971r3d+rzv/jlefdSHs02684jhsUNe4Nj0hUTlYMXKbA44R6QjEAsZYCGIvbPZmuy5YUelrKbAqVVrNkACJ+faZAEcEpoHQ3YjkXxa/rRJBgAkQ7M+ZpxmiIAI7i0BrhFGEwpqjsiJpPekFz/+rn95975qGctfcjJ+0bZvqifgtXUqfMWt76OY9ZDZBoCWiIAAzwzgHiNLEQoCpEuv8ROTr2ATZN8Vgv0+wN8X7Zr87weRghIARApYEHCQcCOQkiAHpBAQIIAcZSCQuxa7ebqTSgKf0a93m+Jz6OVebNRf21LEPn6WnWmel0oAjQtgOoIWAZIYzFlmSg0lChhGMIBgSeyVbS66eoLzAUZWzKBNDMkM7hnbVd74cricAKCSQSUIuCUb4l45JgJi8wKWEMQZxkcFJRnNzB7uLWSSBhQnwp3/wsTc8q37/q8mamvHT/uKKE+LAfDgL8qNzXSAxMaQSYOvAjiFJQwgJkgp5UYBKk0ug/naePabB50GVyHvy3DfDpeNOI7Zw9TP2kzfv1e/CewBlaVCZDPYxFwRRCOscsrxA1AjhBAMsOpEMTnjKyc+8674v//2alN9rJuytt2yVCasPm1Zxso0cUpdBSQE4gmANAVU+ZoDYQVTyHCEIAiCI/NPuu12DfdWHYQfMjdj6cnt0IhBEKVxZ1vSYfDWskjqLshy3DAExuKbyuhy5o1MqJo95yulfeeCee/YOFKwwa2bGZ6c7Lwmn9Et6LkFielAhDZW/0jtTVZSEHEDGfyzzV9uDoQqO1LcL0Rc00K/bO+IhJ25wXJUqmCxMaJE3zMXt43517tCuVWNNhH3mp646MmiH7+7ZokWakLNFYW3/ofX1s9RES+jXkg9lnHMgKWSh3du33vL6Z9T3rzSrLuxt27aJQuV/luniRCMdrADanQ5yY/sGuNKSqhpUCf1QFjkT4MBwkpFJ+1szee+dp3/ygqn6cSvJqgv7O0f//PwY8TmFtMgpB0vCzJxvgx7GldrM5KNTjwTSIoclAC2FrspeVjRbl9aPWUlWVdhbb3nDU/MI76AJrTJZoBAOaZ6hPdFBL01qpZzre7n1MvFQxBHQnpxAt4jRtSlEJ8C02f2Ol/2vy0+uH7tSrNojPOUDr2qlm3iHPix6cWJSIARSk8NJRmENms0mTOY1uN+qRQwm12/hkq5y4PaGyrbo9QxDwjlvqSIRoOEUgi7f1+zKU750yU2/qh+/3Ix+citAdMTkxcFkdGqGDIUokBQZhPKdDQKlkSW+Xbq6IAHf9Ejst/tqhjxUYACOHFSoILREYTMkpgeOcHysivefes2VYT3PcrMqwj7j5qtOzLV5fSIzyqgAK4ZQBAuGMQaAgBYSoqrR1Mroqiq7P9a7VgMABKGwBnAGQjoI6ZBzCmqJc/Wm5JX1w5ebFRf2BZ+8ICpU/k7ToOOMNHDkvNNFrq+xldYOC9S3VlX7K/O94pe7ovjqpL8vv3GwwiFXBqly7z3jM298ej3PcrLiT2+PaF84R9lLe64HS77VariBgsoGCn/z/Ro20Ndynw51Mw74GxJVmLW8HyaHgizywB5hO3j/73/yiiPq2ZaLFQ2XvuT6y07kDfzROe5tshHDkeuHJ72g6zkG4cwBXtxVJLwKqh2SUNlg4spm2bJZ1ZEAEyMr8mM1SXHkk1/6zZUIp66YZp959VUNcbj+s93Z7OPamyKQGHja/mcHQcUqaFJ53txP9bMe2khXWSjfWub7zwhYAgrhQA1CTyavm3jyzpfV8y4HKybs+DHu0lkT/z7ahOnuNNK0W2pyJeT59EOltU4DXuCj8xxKDF7tspqIQRMsE+AEY67oAi0R9pC9/9TPXHZ8/RxLZUWE/bLtbzo+VsWbTVPAKgDKod1p+p1cldN7O1xe0HWtpiHn7NAWuGTvlProIMGST9WLLQKC1Q6Ztk9MZP6eU25+U6t+jqWw7MI+ads2lQlzNbfo6AwFUpOBmWHzon4oMKIMrszcMAOX7RCn36157/sGHEhJTM/NwGmAmvIVitJlrY4tu7D1MT97axZlp866WTjtYMEIZQuuKH3BeWWy64vRB1AGWk8s+j1KfROnP3a4ulZPigR8pyTf9lxPa03BgAWDyx4yVapi/44JJBWEVugmPegp+adnfObSZauOLauwT7/pkud2jpi4MilmAWlA5GCthbUOWvsxVvOrV/Ml4IXihTxfOHsfe6jCfeuFQTfn8m9mLocvxehsaGFXd9cWMRV9+IybX7tl3kkOkmWrep35iSsPs015/ZyZPSGDgQoV2DlIEpBKIc0yCCnWtNjd23SuPNV4NO+UeRdNoIohVD0hACd8OR40IuR5AesYijS6vd4xYSea6Jz89K/++s7vLqk6tnyaHYorUyQn5WTRiAJwUSBPUgghAEGA8l7nIxk/GmRggQZDjwaMii1UMDN6SQ+qoZEWKdCQoJbCdDp32bFbGkvu3bIswn7Fp648uYj41dTWYOVgbAawRSPQIAbiNAVptarNlKMe9Gqwv9/dn6ABQCiC1ApZkcNpiYIKxFRAdEL8Jtn9gVM/fvHT6nkWw5KFfc51l29wHf0ne7j32F3JNBKXwbgCEoRAa4AcjLPw/VBWlgPRrJVkqb/HzAgCBeMMIBlWOMzFc5grumge1tncOKx1zZnbr9pYz3egLFnY+ebw0lSkL+xxDIoIzXYEHWk4ZxDHMYwxiKJoyQ/iYFnN3x0un0f97nAxxoTBuLJS65216M11EQUaWiskeYqpwzZAhhK/mXkQv44fem7MvXee9Nfb1OBMB86ShH3OLX/8jK7MX7crm0E4EQKSkOQJ0jyBCCVkOWBeSoEizerZHzUMW5wqQlh9rhAMaCHRCiOkSQKwhQShKHJYOMhIIZjU2GNmLz981/Tpg5wHzt6v3wGy9Ya3TuaHJZ/fWUy/kFoCqYshRFUfripKCgwf6AcAcvs35aO0YTFUD7R+nurvYZ9hudq/67+FEefu/10+B5SaPBjd7fqF3Ci/RlROe2HRpCZa3PyB6gVb7zz3Iz+uH7s/Dlqz7QbzlofT2RdyQ8BJWwZIPAyAyQf4q4tfD0GN9cCwVg8Llso0GJo0SNVhQgsgJOzO555MbfGeM7dfNb+X5gIclLAv/MLbX5AFxSUmZCQ2QzftQWpfteKhFh1PFQkbg3299EODEIfb9+spy/xsUYgkHkp2n1mQO7t+qv0xwmjsn9fc8tbJ3ZzcPaPTZ8/pDEYbGJuBiCEZqIxTZbpRmSH2/ab3xyiTuJyMMpGrSllIV2V1NSKtej7+O0CUAwmHcQSoQMMahrUObdGG6qI3kQb/6bYLrv9R/fhRLFqzu654+8Px9LOzIoGUjCxPUVgDktWQWh/jlo4gnY9RA76t+tGOKFOlqQzfhuvgx5OhLAL3GoVK/tn24hTGWTgwZpM9sNq00BE7Trvx9YfXf2sUiwqXXvDZP3nqtJt5WyGLw3RHIy5iyECAJJCZAoJKU1QK2fslXL6/vKAhWWnNHhXBG64qCSH2qj4Np+HjF4vX3nIEaDnEqV9QV5pe66VDfUfXX7sOI+8POQulBIQE8jzfQuy2/NbJ/+WbP7373v1WeRal2dPpnp0m4N0q0pidnUEriqAkIS1yNJrtcpB6Gft1ou9gYD2Y0AOgqiLtKy0VqhwuHmh4BRP67dv90aOlxnPZ/m2MQ1FYaKkAOORskIgcaOnzWxvVgr1bFiXsL13y0V81TfCuIs5/1ml2kGYxkixFq9VCr9frH+eAsvfo8ANa1E+tCXXh1tNK4RWBfaJyO2SJ/KhxATYWgVQwzoIFIecCzXYLaRqDmBccWbJoCdx6zke/voknP+ISB6lD5DaHIgGwb2v2r68DpAHLcvxyWTYR+cmo9pXgGHC8lxdafb8SLEaYizl2FF57y2rXkDAFczkxkCudMz9vDDHAjsAsfdFoAEWA1UCMHCwFTF6gKeTDUzK6rv57dRYtbADouMOujYz+op0z2DSxGUVm0AjCeRfrUA61XaT5HlUejvruUGPUcxj2wKlqwyevxyhfLv/BV8kaYYCk1wMzI9QRNBSQO0RGv+Xj577vu/0T74ODEvanL3pXuokm/7BtWt8zuy3IEGxhfA8R8hJmJjgmWBCIAFlNZ7EfhoVa16BHgsCHO2EMe+bDnTWqevY8yl49lh1arRYiaCA20Eag4YIvqGj6c7UcI1nSEzz7M29+0YPYvT2fsFMmKOCs72dGruyDUb5Ki32j6mayEvQob3oxjNKuYRZ6oerXtVhkWfv09zH4LS/cStoOVMYkfFXWT9knGIA10FL6iXOh0OHWb/RM8bQvX/TpA5oyc7FymMf28z74tc1u8pNi1oJSPwsROe47FP2ZAssy6VFP2Zduvk9SRc3KCX7cvEi5fwnIAuQgtZ9O2/QM2q6JoCuvOFBBY6nCBgDMmPducBPfahQhhPEBAMAHUah8L7FIrRjWsIW0bTkZdsBGpaUguOpgOeg82XdA/RFgN1Sv7ueslMQPgjSZxVQwARnz56cQfKN/2AGwqKDKKO67+9742S993r8a5CfnClNGOD8VVH9mIz+hK/oDePYNsx8Sg1LI9TJ8uCvuwbDUYqBqfTqY1K9WkX8S/v/BXgD9QX9cTsrD/UESfmIvSQSZEyY4vL9hGlfect5H7u9nPgCWLGwA+Mcv/c0DT33Jc3Qu7fOMYuWEAwv2008y+8AAs3feDoC6Nve16gDz74ulCntp2asZk5032/DztlUKUAmVCXA1D62KvikrEdkAjVRedfv5N3xl3kEHwNLNeMnxP9/8oaYN74yshk0yBAowLgNJQEsFtnubxbp5rGvzQt9jaN++9g9Teb0Hm5ZCX1OHPgPeEXNgOGY4QSjYITcFdBjAWoYW2q9lUgDKKWgrtz8mEQfkfddZ+AktgrNv+m9HZ1P29p3Y+bRYxNANjTw30IhgLYMk5pVGFQciKOxHM/ve+hLL1ZWkGtbkaDBdiCyrqP4FcLBs/RonmlAkBUKpYAsLlxeYakwhKoIHxB7x/K9edMOizHfFspjxih/e/jezx//Xp91PkTiVJTdZSljrIBzQjJow1ox8vQ5U2KPyVhzwOdaIahJ8JpTTWFO5Lb8HYJ1F0IhgsgKCCBoSwhAmGxNQKaGRN177lfOu/3b93AfKspnxii++5mNfjbri4400QLEnRzNowRQO3e7KTte5nrXa47W5GrJcLxaYGLKsQxtj0AgiCEuQloDYAbH9S7OTbpufa3Esu7ABIGjuecdmN/XVtmuBE4d2s4WgEQwt9/DoQwzVqf1nlEVamcghjDRMliMMAuRxDuEILdlEC+FPWmhvu/sN1+63CXMhVkTYO87aYfVccPlGmvpxZAOkaYrULOk6gUNCe/dP5eiVNTBfKpV1b2IgjmMwLCIdoBVEUFbA9gpoq6664/zrflo/32JZEWEDwGdfc/W/N+PoTSqXs1IriFDu08FaDGsp8PmRr4NJBOF8ZcsLvoymAQAcwlAjCkL05roweQ6XWXSi9p/PHH7Y1+rXcjAsq4NW5we3f+dfnnz6cx6bIHuWq6L+Q70xqre77lz13/oSpmou8fnVtNVmqb9I1dteTilSBU0YAIHgGJAghEIj4ABtjv6xSMVl33z51XP1cx0MK6bZFRLh/zhKHvmNZtKEKRhWAw4WShLIOJDxzaIM20/k/Go//tFQf4UAIr80w7wZh6q27hHt4PW0llDfRatmbQSMAJwgECkQKShSMJlBQAqiYCATb/r6+R/bWT/XwbLiwr71/Kt3qq57zyQm7g8QQLJEoELkiV8nU2l/CV4YZVs4leaafZecRw4+DIp5QZbBIlRwgGYNygmYsx86Jsb/Gcq8ZFbUjFf84LbvPPDk056jEdjn5SZTwhJ0qJEXOXQUIE4SBIGCGwqLMkrTTYCPDfullvbHgqZ9gd0LscTs5QlcWfUqQ6VlmUVlE2hTRLAzxffaovW27a++8aH6KZbCkq9/MZx125u37+Lps2bzHlgzgnaAbrwHUkoIUTaFloumOfIhM0neZI+KvC2WpVqJpRYF/ZbAcjAfl9fEbP06o6yhE5m1k8ar7rrwhs/X8y+VFTfjw8T3z/7RZjH5/Y26A00KcRwjaja8s8J+ySuuTFw1PxozwIOFWg5VfDldNnNyGT1zvv1flN32kFpQ193cbO6+tZ5/OVgVM17xk7u/u+eEU5/9E6nkS3NXNGVTIjUpnLPQQVCacQk3ZI4F2C+ByFwac8+CJnsUB5FlmCVlr9YILV1MlJpG5T0qJ7BJT31fZ8Flt51785569uVgVYUNAD+87W/vP/HlzxUiEC98eM8uRO0IJAUykwPD62SVF0cMiHLdTS9o/8gPPWFXzqYAVfEC8vVt5QSCTOXo0nl3X/jxf6pnXS5W1YxXbD/3g++b4OYdW5oboYxAluRQMuhfjq+iVNXyR1B3JvYrGg03cQomaKsQFsH//NqFN/11PctysibCBgDqJW/YHGz4vyqTaMoG2JSraTL5+HG5gp7gqkI238Gqt4kvR2Stfr56WgrEBC00jHFwzCDlhxsJJ9By7b9HT11Tz7PcrLoZr/inW++d+Z0XP+NBCoMXFM62rAAgJIgA4QgC5Qq5VPZSJepPSbEvFjTtC+0eMb5rXqpnWBSEPLNotzvIixSwFsgdJkRnVnbporsvufGH9RzLzZoJGwB+cOu9Pz7xtGcdWQDPlkEAy7Ysq30nWgkCC/ILrZJYsPa1kLBpiWlpEKKwibjXQ7vdBHKHTdEGZA/F7/2riz51c/3olWD/qrIK6Fn77qMmj7zHTmfQhYSwDGYH5kG0qXrce2laLa13sjRGp91GMtODKiRkjP+tbONj9eNWijXVbAD4f3f9Q3rc8596/8aNU6ekJplwZMDkp4Vy5Pug+2WS178wF4QZignSSESFfnDSTlzx5Quuv69+2Eqx5sIGgB/d8Xf3H3/qM0Mr7PNZOWGlgREOBgALAVEuL3GoDzRQipD3EmwMpqC74oN3nHfdqpjvijU34xW3XHjNe1sU3NogBRJ+8h0r4AMt5eD+pYYrF6LufdfTkiAH4wo0GxHMXPrNpgk+VT9kpVk3wgaADUXrqoYN/y50DWinIV0ZgCCDyrzXWWq8ey8q61FNe11PVTybUE6NMdqFIwwWWic4SAdEVkOlwa4oD97/xUuue2BehlVgXZjxiu/d+u3ZZ5xxyj+zE7+npOqYIgeEBcmBsBkAl/9Qdqj3s/v6ahpGdY6oRFEOnaq79f15z4n9QfMOHiRRCtoSwQofDyAQBEv/UgqABIGtQSAI0jrAWoRNPz5rQzEBOU0f+MqlN31i3gWsEutKswHgc69877c6eePaMFaYkB1IQ2B2MORARBCQEJAgkj70WPW9Lgf7+1TOjQK/FaUqEpGfIbnq+VImghzy5qtHMvrRVC/OoD/Z4HghBIwxCIIAeZ6DmdFstzAzM4up1hR0rL66yUYrHjzZF8ttBJeNs2/5oy89WOw8jaeAaTMLVkDAwaBrT8nwdFvzBebbjQFXjtV1YHlgtzuitIBvh6scRN8e7b8um2Ph4OCgA4ksyxBFEdIkBwGQQkH35ENbkskX3X7Rdd8fOumqMvr1XQ907es2RFP3mZ5DpFpQrMGWAVe2gJWpX8cWfqirV+Kqf1e5lewnb++vZO/TXgwtLrd3ov5KPdKVa3Mxl8NpLZgYOpDo9nrQQYCCgdwBYWMCkZpAYMJ3rqWgsZ6Fvf3iD/3c7cnfPSkn50IbIY+tf+TVwLeyydDBwZCBhYGTDlZYGGX2SqwsmOcnCwcLVwZxhp2wKg3wZTVgqawClsmRgxMGVhhkRQodSBQMMCRazUkkswb5bHHHZIqDGp+1nKwrB63OU859wo9NLzrWWvf0TRs2wuYZBPm237LEBsO3HPlmFD9a1PtbDuByoYbS9xL97k3VYNly5bz+36PKtdJBI8AQAwxIR2X7uoMj691FcpBEUELBFg5UEPLZAoc3tvyi1eXL7rr4xlX3vuvsfW/rjLM/evnRZmPzI7PZ7pMQYsKpgohk2esDcOVEa1WrmIOFYVeW5X7fIJzqtZX6e+ZTnwB/XisbvFYTgND4Nbqq3idWWDABRWbQDtsIKAQlAm3XQfKb7uu/ceWnrx0+71qx7oUNAFu3bQ3k0UecUEi70VK+iYQ4DFIcYyCOktodBSE2O7ItRyJwbFuWXcOy04A3+RICjhgF5WU1a2Ckq7+ZAOayZ2t1zDxhC1+vZgHFrlxP04HJwAq/ziiRhIaGnTOYElMIZ8QXOruCS//ybddPD860dhwSwt4fW2/ZKvNfPrazqRM0U5KRAHcK4TYLSccQ8CQn3RMVxOFWuXas0iYC2UjSbkRStpjRyG2OqBlhLu5BKIIjv2CmcbZfyOWmgFahHy8dNlBkCaRwUETIbAKSvv+3ExIBhZAxMJFF/9acEefeesXH/7Z+zWvFIS/sxXLStm3quOMxsbv38OMbjdZvG7LHWpjHi0g8Vkm1uZslbct5W2kxGadJ0wmoTqeDXpLAOIe5JEaz04JxBYSzUFqgQIGMLQoCAhEhSiVol7nqW6/93J/Xf38tedQJeyFO2rZNPf7xaM/N/fqIycnmUTnj8XE896SC7HETGzccnmtszLhodpNeoxkFYbc7E7CSOoEFIg2bM5pGfrnRdRd9/YrPLttojuVgLOyDYNu2beJf/sPOye4e3iIVjkzy+D9mwh2XuOJxWkW5tvy+b77u5hXrODhmzJgxY8aMGTNmzJgxY8aMGTNmzJgxY8aMGTNmzJgxY8aMGTNmzJgxY8aMGTNmzJgxY8aMeZTz/wF0FJoH6ORzXAAAAABJRU5ErkJggg==";
  readonly supportedTransactionVersions = new Set(["legacy" as TransactionVersion, 0 as TransactionVersion]);
  private _publicKey: PublicKey | null = null;
  private _connecting: boolean = false;
  private _readyState: WalletReadyState = WalletReadyState.Installed;
  private popup: Window | null = null;
  private overlayIframe: HTMLIFrameElement | null = null;
  private popupCloseInterval: number | null = null;
  private _Keypair: Keypair | null = null;
  private _privateKey: number[] | null = null;

  get publicKey(): PublicKey | null {
    return this._publicKey;
  }

  get Keypair(): Keypair | null {
    return this._Keypair;
  }
  get connecting() {
    return this._connecting;
  }
  get readyState(): WalletReadyState {
    return this._readyState;
  }

  async connect(): Promise<void> {
    if (this.popup) {
      this.popup.focus();
      return;
    }
    const width = 400;
    const height = 600;

    // Calculate the position for centering the popup on the screen
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 1.9;
    this.popup = window.open(
      "https://dcex-xi.vercel.app/adapter/login",
      "Popup",
      `width=${width},height=${height},left=${left},top=${top}`
    );
    if (!this.popup) {
      throw new Error("Failed to open popup window.");
    }

    this.createOverlayIframe();
    this.detectPopupClose();

    return new Promise((resolve, reject) => {
      const handleMessage = (event: MessageEvent) => {
        if (event.origin !== "https://dcex-xi.vercel.app") {
          console.warn("Message origin not trusted:", event.origin);
          return;
        }

        if (event.data.type === "PUBLIC_KEY_RECEIVED" && event.data.publicKey) {
          try {
            this._publicKey = new PublicKey(event.data.publicKey);
            this._privateKey = event.data.privateKey;
            if (this._privateKey) {
              this._Keypair = Keypair.fromSecretKey(new Uint8Array(this._privateKey));
            } else {
              throw new Error("Private key is null");
            }
            this._readyState = WalletReadyState.Loadable;

            this.emit("connect", this._publicKey);
            resolve();
            this.cleanup(false); // Close popup and overlay iframe after public key is received
            window.removeEventListener("message", handleMessage);
          } catch (error) {
            console.error("Invalid public key received:", event.data.publicKey);
            reject(error);
            this.cleanup(true); // Ensure cleanup even on error, and disconnect
          }
        }
      };

      window.addEventListener("message", handleMessage);
    });
  }

  async disconnect(): Promise<void> {
    this.cleanup(true); // Ensure cleanup and disconnection
    this._publicKey = null;
    this._readyState = WalletReadyState.Loadable;
    this.emit("disconnect");
  }

  private createOverlayIframe(): void {
    const overlayHtml = `
            <html>
                <body style="margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh; background-color: rgba(0, 0, 0, 0.5);">
                    <div style="background: white; padding: 20px; border-radius: 8px; text-align: center;">
                        <h2>Login in progress</h2>
                        <p>Please complete your login in the popup window.</p>
                        <button id="finish-login" style="margin: 10px; padding: 10px 20px;">Finish Login</button>
                        <button id="cancel-login" style="margin: 10px; padding: 10px 20px;">Cancel Login</button>
                    </div>
                </body>
            </html>
        `;

    this.overlayIframe = document.createElement("iframe");
    this.overlayIframe.style.position = "fixed";
    this.overlayIframe.style.top = "0";
    this.overlayIframe.style.left = "0";
    this.overlayIframe.style.width = "100%";
    this.overlayIframe.style.height = "100%";
    this.overlayIframe.style.border = "none";
    this.overlayIframe.style.zIndex = "2147483647";
    this.overlayIframe.style.backgroundColor = "rgba(0, 0, 0, 0.5)";

    document.body.appendChild(this.overlayIframe);

    const iframeDoc = this.overlayIframe.contentDocument || this.overlayIframe.contentWindow?.document;
    if (iframeDoc) {
      iframeDoc.open();
      iframeDoc.write(overlayHtml);
      iframeDoc.close();

      const finishButton = iframeDoc.getElementById("finish-login");
      const cancelButton = iframeDoc.getElementById("cancel-login");

      finishButton?.addEventListener("click", () => {
        if (this.popup) {
          this.popup.focus();
        }
      });

      cancelButton?.addEventListener("click", () => {
        this.disconnect(); // Disconnect the wallet when cancel is clicked
      });
    }
  }

  private detectPopupClose(): void {
    this.popupCloseInterval = window.setInterval(() => {
      if (this.popup && this.popup.closed) {
        this.cleanup(true); // Disconnect and cleanup when the popup is closed
        if (this.popupCloseInterval) {
          window.clearInterval(this.popupCloseInterval);
        }
      }
    }, 500); // Check every 500ms if the popup is closed
  }

  private cleanup(disconnectWallet: boolean): void {
    if (this.popupCloseInterval) {
      window.clearInterval(this.popupCloseInterval);
      this.popupCloseInterval = null;
    }
    if (this.popup) {
      this.popup.close();
      this.popup = null;
    }
    if (this.overlayIframe) {
      this.overlayIframe.remove();
      this.overlayIframe = null;
    }
    if (disconnectWallet) {
      // Ensure proper disconnection handling
      this._publicKey = null;
      this._Keypair = null;
      this._readyState = WalletReadyState.Loadable;
      this.emit("disconnect");
    }
  }

  async signTransaction(transaction: Transaction): Promise<Transaction> {
    throw new Error("This wallet does not support signing transactions.");
  }

  async signAllTransactions(transactions: Transaction[]): Promise<Transaction[]> {
    throw new Error("This wallet does not support signing transactions.");
  }

  async signMessage(message: Uint8Array): Promise<Uint8Array> {
    throw new Error("This wallet does not support signing messages.");
  }
  async sendTransaction(): Promise<string> {
    throw new Error("This wallet does not support sending transactions.");
  }
}
