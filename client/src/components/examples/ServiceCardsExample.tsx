import ServiceCards from "../ServiceCards";

export default function ServiceCardsExample() {
  return <ServiceCards onServiceClick={(service) => console.log("Service clicked:", service)} />;
}
