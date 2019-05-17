import jwt from 'jsonwebtoken'

const SIGN_KEY = `MIIEogIBAAKCAQEAm4815zxnPfoGK54IbKTefO2AtVDRFKCsM7eDgn4BGyRB9WT8
1oyzgZDO3i10vsRhxl72Sn6IK3GPAfeuMwUNf/SAFq/kIRh+wf9SK7LZkp692zNH
kw0ylqr5jnHSmsdeoXuTBJnjYFEyCYrq4yGrpuq3UImHPbqCAfCzAW114E6WWwNc
1/YLXC8k1ayepce6G34dm2qscNNiUL7krTPguP4Od9knI7yLZJ0axFJGORSyVt8/
MA+DkN58CpZ9ol8Xb41xCex5iKR3hoJMQ2ey5uAsGguZvyKrtI16aOEVf1OheoBz
nSlthWnc7Atx2yolh1V+Mehnwq/rFSRS+WBBFQIDAQABAoIBAAnM9wdvjc2gz/y1
gzBdHsteJ0rFIbcb/F1xxW5WQ/mSyjkMuMVHrhOOrQngcUeHleVqnDfLSwb5q5nj
Ie2C9vvFysAjKstPAMV2MZYhOYX8TFfgHjVMkpBdi0WHNE6eGv8viu6yR1oNI4ro
Xq4as/bbONtxHr0r3/8BTDXd0JxmHfkr9HdVlhLSP2dVIJuWvLLN0N9VyxWUW4f1
hXmCcGV6xK9E4lTxBm5QOFoX6pWsxeOtzjJhHbdVcr0c6scySY1aj6+ctqY1Cecf
8aHrxX6QcI4l3Mx4GndfWQpOtwlHDQUiOtakRLIl9n3Cx52s5djE11EJbVfbI2bb
hTmLI+ECgYEAzTAMye7t0nsG10WOFOXqjnO8esdcqIRSitdP7XtwHTJjLEtBb68F
rlR8pVjjJ/LqQwkbW+CNBZuYC2GL3+r2b7clWPQ5gJoivHsKxPqgI9rrKWnUiU/Y
TcDSr2605sWg6Z9ARYRG9Wh0H+/VPWCzwjjSlr6NdsmufmxcplmXW6kCgYEAwhT1
G7o37/ESV0LVcXZ++VbgOOwR1Vae57Lnl3a27307lBz+yULII3l8vHPpV1cB+bkL
gZYb4BO1C2D0zHUwMDSmB7S0oVR0dKoC+4soMRhce13qH/nt/YMGOM0s57w8F8J/
PH1BvjW4IdCrrCxPW3QKfm3qQ0qxPelD6w3/vY0CgYB2q1aKJ2xWMh73u9t7jKmG
b7tPSyP0tmrCr9ojICPsTur6gB+9Rv1DIMviGTFvNld0I701+v20g5OA6Y6rF0ol
vEeWVdE35m02kvbci5K4ifE9x15Ld+lCtsVi/uUTHrN8ykSyr9kWL64RlnS+hcIR
DyoEUvqf++62YVeIQgJ+2QKBgG7OmlZ3TkJ+p5MMhGJgXgQrdp7pIRFlgBoXCaRv
UeiP3nkkyM7NgwjF7tKFdx63fVg/LvOQaV/YwI+7jmhBK/8JwBU8Nbi6SDbnbgaB
n7PQDdUdfHM/NYJ80QuTEOVJkiGamRxHA0b+0p7zzV/ieHhlWyxtwscimOkZCf7k
ojNtAoGAQDNJ3AxTHQDlKsWhIJVqQ1H7QUF0lyAcH4FVBEeShNqWNVi8pXz7ir9a
fNEcvc8HQcF5cSOQWyp+n5T0ofk7a4rika97hGBYRWEvQU9ZpFTAYiCgQ+tOeH4k
YpaUqHEaYhs6HdUp5U24pt+5xXFogINq5BXk761/ni2RdI93HyM=`

export default class EncryptHelper {
  static encrypt (str, iat) {
    if (!iat) {
      iat = Math.floor(new Date().getTime() / 1000)
    }

    return jwt.sign({
      value: str,
      iat: iat
    }, SIGN_KEY, {
      algorithm: 'HS256',
      expiresIn: '1h'
    })
  }

  static decrypt (str) {
    return jwt.verify(str, SIGN_KEY)
  }
}
