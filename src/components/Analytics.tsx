/**
 * Privacy-first analytics loader.
 *
 * Returns null (zero bytes shipped) unless one of these env vars is set at build time:
 *   - VITE_PLAUSIBLE_DOMAIN   → loads plausible.io/js/script.js (cookieless, GDPR-clean)
 *   - VITE_GOATCOUNTER_CODE   → loads gc.zgo.at/count.js        (cookieless, GDPR-clean)
 *
 * Both providers respect Do Not Track internally and do not require a consent banner.
 * No fingerprinting, no cross-site identifiers, no third-party cookies.
 */
export function Analytics() {
  const plausibleDomain = import.meta.env.VITE_PLAUSIBLE_DOMAIN
  const goatcounterCode = import.meta.env.VITE_GOATCOUNTER_CODE

  if (!plausibleDomain && !goatcounterCode) return null

  return (
    <>
      {plausibleDomain && (
        <script
          defer
          data-domain={plausibleDomain}
          src="https://plausible.io/js/script.js"
        />
      )}
      {goatcounterCode && (
        <script
          async
          data-goatcounter={`https://${goatcounterCode}.goatcounter.com/count`}
          src="//gc.zgo.at/count.js"
        />
      )}
    </>
  )
}
