import ServiceDetails from "../ServiceDetails";

export default function ServiceDetailsExample() {
  return <ServiceDetails onContact={() => console.log("Contact clicked")} />;
}
