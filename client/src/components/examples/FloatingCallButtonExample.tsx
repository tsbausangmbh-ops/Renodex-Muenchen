import FloatingCallButton from "../FloatingCallButton";

export default function FloatingCallButtonExample() {
  return (
    <div className="relative h-48 bg-muted rounded-md flex items-center justify-center">
      <p className="text-muted-foreground">Scroll auf dem Handy um den Button zu sehen</p>
      <FloatingCallButton phoneNumber="089 123 456 78" />
    </div>
  );
}
