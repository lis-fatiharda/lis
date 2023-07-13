// System class Manage numerator

export default async function answer(params) {
    console.log("eMutabakatAnswer", params);

    if (params.accept == true) {
        await global.BAGDB.query(
            `UPDATE IASACCOUNT SET BAGAGRUUID = '', AGREEMENTDATE = '${params.mDate}', BAGREJTXT = '' WHERE CLIENT = '00' AND COMPANY = '01' AND ACCTYPE = 'C' AND ACCOUNT = '${params.account}'`
        );

        await global.BAGDB.query(
            `UPDATE BAGMUTABAKAT SET AGREEMENTDATE = '${lis.format(new Date(),"dd.MM.yyyy")}', ISAGREEMENT = 1, BAGREJTXT = '' WHERE CLIENT = '00' AND COMPANY = '01' AND BAGAGRUUID = '${params.uuid}'`
        );
    } else {
        await global.BAGDB.query(
            `UPDATE IASACCOUNT SET BAGAGRUUID = '', BAGREJTXT = '${params.stext}' WHERE CLIENT = '00' AND COMPANY = '01' AND ACCTYPE = 'C' AND ACCOUNT = '${params.account}'`
        );

        await global.BAGDB.query(
            `UPDATE BAGMUTABAKAT SET AGREEMENTDATE = '${lis.format(
                new Date(),
                "dd.MM.yyyy"
            )}', ISAGREEMENT = 2, BAGREJTXT = '${
                params.stext
            }' WHERE CLIENT = '00' AND COMPANY = '01' AND BAGAGRUUID = '${
                params.uuid
            }'`
        );
    }

    return true;
};
