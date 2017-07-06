@spock.lang.Unroll
class CheckProofOfConceptSpec extends geb.spock.GebReportingSpec {

    def 'check telephone number is #text '() {
        when:
        to ProofOfConceptPage

        then:
        at ProofOfConceptPage
        customerInfo.text().contains text
        
        where:
        text = '1300 032 032'
    }
}
