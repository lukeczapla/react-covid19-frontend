import {useContext} from 'react';
import {ApiContext} from '../../api-context';

function DownloadButton(props) {

    const clickLink = (e) => {
        fetch(props.url, {method: 'GET', credentials: 'include'})
        .then(response => response.blob())
        .then(blob => {
            let url = window.URL.createObjectURL(blob);
            let link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', props.fileName);
            link.click();
        });
    }

    return (
        <button name={props.name} onClick={clickLink}>{props.text}</button>
    );
}

const Reporting = (props) => {

    const api = useContext(ApiContext);

    return(
        <>
            <h3>REPORTING</h3>
            <h4>IMMEDIATE ACTION DAILY CASES</h4>
            {!api.crosssite ? <a href={api.urgentxlsx} download>Download List of Past Follow-up/Immediate Follow-up Cases (Excel/Sheets)</a>
             : <DownloadButton url={api.urgentxlsx} fileName="urgentCaseList.xlsx" text="Download List of Past Follow-up/Immediate Follow-up Cases (Excel/Sheets)"/>}
            <h4>OPEN CASES</h4>
            {!api.crosssite ? <a href={api.openxlsx} download>Download List of Open Cases (Excel/Sheets)</a>
             : <DownloadButton url={api.openxlsx} fileName="openCaseList.xlsx" text="Download List of Open Cases (Excel/Sheets)"/>}
            <h4>PERSONS PROHIBITED FROM CAMPUS</h4>
            {!api.crosssite ? <a href={api.blockedxlsx} download>Download List of Persons Barred from Campus (Excel/Sheets)</a>
             : <DownloadButton url={api.blockedxlsx} fileName="blockedList.xlsx" text="Download List of Persons Barred from Campus (Excel/Sheets)"/>}
            <h4>CASES AWAITING DOCTOR'S NOTE OR DOCUMENTATION TO CLOSE</h4>
            {!api.crosssite ? <a href={api.awaitingxlsx} download>Download List of Persons Requiring Receipt of Medical Documentation (Excel/Sheets)</a>
             : <DownloadButton url={api.awaitingxlsx} fileName="awaitingReceipt.xlsx" text="Download List of Persons Requiring Receipt of Medical Documentation (Excel/Sheets)"/>}
            <br/><br/>
            <h4>SYSTEM REPORT, CASE ANALYTICS</h4>
            {!api.crosssite ? <a href={api.overviewxlsx} download>Download full case reporting (Excel/Sheets)</a>
             : <DownloadButton url={api.overviewxlsx} fileName="fullCaseReport.xlsx" text="Download Full List of Cases (Excel/Sheets)"/>}<br/>
            {!api.crosssite ? <a href={api.exposedxlsx} download>Download full secondary (exposed) student/faculty reporting (Excel/Sheets)</a>
             : <DownloadButton url={api.exposedxlsx} fileName="fullExposedReport.xlsx" text="Download Full Secondary/Exposed Reporting (Excel/Sheets)"/>}
        </>
    );
}

export default Reporting;