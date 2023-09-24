// ? modi: -1 = create new document by reference
// ?        0 = create new document
// ?        1 - update the document

export default async function ({ plisfindocs, modi }) {
    // control for save of lisfindocs

    await this.ctrlAuthorization(plisfindocs, modi);

    const olisfin003 = await lisfin003.findOne({
        company: plisfindocs.company,
        doctype: plisfindocs.doctype,
    });
    if (olisfin003 == null) {
        throw new Error("Muhasebe Belge Tipi Bulunamadı!");
    }

    await this.ctrlAccounts(plisfindocs);

    plisfindocs = await this.calcBalanceOfDoc(plisfindocs, lis);

    if (modi <= 0) {
        // Get Document Number

        plisfindocs.docnum = await Numrange.getNewNumber({
            company: olisfin003.company,
            numrange: olisfin003.numrange,
        });

        // Some Settings

        plisfindocs.finperiod = lis.getMonth(new Date(plisfindocs.docdate));
        plisfindocs.itemcount = plisfindocs.items.length;

        // create lisfindocs

        const lisfindocssave = new lisfindocs(plisfindocs);
        await lisfindocssave.save().catch((err) => {
            throw new Error(err);
        });

        // Update lissaldocs
        if ((plisfindocs.saldoctype != "") | (plisfindocs.saldocnum != "")) {
            lissaldocs.findOneAndUpdate(
                {
                    company: plisfindocs.company,
                    doctype: plisfindocs.doctype,
                    docnum: plisfindocs.docnum,
                    _deleted: false,
                },
                { isfinance: true }
            );
        }

        // Update lispurdocs
        if ((plisfindocs.purdoctype != "") | (plisfindocs.purdocnum != "")) {
            lispurdocs.findOneAndUpdate(
                {
                    company: plisfindocs.company,
                    doctype: plisfindocs.purdoctype,
                    docnum: plisfindocs.purdocnum,
                    _deleted: false,
                },
                { isfinance: true }
            );
        }
    } else {
        await lisfindocs
            .findOneAndUpdate(
                {
                    _id: plisfindocs._id,
                },
                plisfindocs
            )
            .catch((err) => {
                throw new Error(err);
            });

        if (plisfindocs._deleted == true) {
            // Update lissaldocs
            if (
                (plisfindocs.saldoctype != "") |
                (plisfindocs.saldocnum != "")
            ) {
                await lissaldocs.findOneAndUpdate(
                    {
                        company: plisfindocs.company,
                        doctype: plisfindocs.saldoctype,
                        docnum: plisfindocs.saldocnum,
                    },
                    { isfinance: false }
                );
            }

            // Update lispurdocs
            if (
                (plisfindocs.purdoctype != "") |
                (plisfindocs.purdocnum != "")
            ) {
                await lispurdocs.findOneAndUpdate(
                    {
                        company: plisfindocs.company,
                        doctype: plisfindocs.doctype,
                        docnum: plisfindocs.docnum,
                    },
                    { isfinance: false }
                );
            }
        }
    }

    return true;
}
