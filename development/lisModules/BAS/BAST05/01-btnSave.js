export default async function (props) {
  props.item.isenable = false;

  await liscurrencies.deleteOne({
    company: props.item.company,
    currency: props.item.currency,
    curdate: props.item.curdate,
    tocurrency: props.item.tocurrency,
  });
  const oliscurrencies = new liscurrencies(props.item);

  await oliscurrencies.save();

  return props;
}
