import { Button } from '@chakra-ui/react'

const steps = [
    {
        selector: '.first-step',
        content: function Component({ setCurrentStep, currentStep, isHighlightingObserved }) {
            return (
                <>
                    {isHighlightingObserved ?
                        <>Skrifaðu heiti á viðburðinum og smelltu á 'bæta við' takkann.</>
                        :
                        <>Byrjaðu á að bæta við nýjum viðburði með því að smella á þennan hnapp.</>
                    }
                </>
            )
        },
        highlightedSelectors: ['.chakra-modal__content'],
        mutationObservables: ['.chakra-portal',],
    },
    {
        selector: '.main-content>div',
        content: 'Nú getur þú séð lista yfir alla viðburðina þína. Smelltu á viðburð til að opna hann.',
    },
    {
        selector: '.main-content',
        content: 'Hér skráir þú allar upplýsingar um viðburðinn. Kíkjum á dálkana í næstu skrefum.',
    },
    {
        selector: '.box-participants',
        content: 'Hér skráir þú hverjir munu taka þátt í að greiða sinn hluta af kostnaðinum.',
    },
    {
        selector: '.box-transactions',
        content: 'Hér skráir þú hvern kostnaðarlið, hver sá um að greiða kostnaðinn og hverjir eiga að taka þátt í honum.',
    },
    {
        selector: '.box-result',
        content: 'Hér birtist uppgjörið um leið og þú hefur bætt við að minnsta kosti einni greiðslu.',
    },
    {
        selector: '.main-content',
        content: function Component({ setCurrentStep, currentStep, isHighlightingObserved }) {
            return (
                <>
                    <p>Þetta er ósköp fátæklegt í augnablikinu. Smelltu á hnappinn til að fá smá sýnidæmi.</p>
                    <Button onClick={() => setCurrentStep(currentStep + 1)}>Sýnidæmi</Button>
                </>
            )
        },
    },
    {
        selector: '.main-content',
        content: 'Þetta er allt annað! Eins og sést hafa þátttakendur lagt út kostnað. Sigga keypti mat fyrir 10.000 sem allir deila jafnt. Jói keypti bensín fyrir 5.000 sem hann og Sigga deila jafnt. Eins og sést í uppgjörinu skuldar Gunni Siggu 3.333 krónur, og Jói skuldar Siggu 833 krónur.',
        highlightedSelectors: ['.main-content'],
        mutationObservables: ['.main-content',],
    },
    {
        selector: '.example-button',
        content: 'Þá er þessari stuttu yfirferð lokið. Þú getur alltaf sótt þetta litla dæmi með því að smella á þennan hnapp. Gangi þér vel!',
    },

]

export default steps