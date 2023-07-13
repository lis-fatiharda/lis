export default async function (props) {
  await liscurrencies.deleteOne({
    company: props.item.company,
    currency: props.item.currency,
    curdate: props.item.curdate,
    tocurrency: props.item.tocurrency,
  });

  return props;
}
