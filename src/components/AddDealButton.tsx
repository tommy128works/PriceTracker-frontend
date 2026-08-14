type AddDealButtonProps = {
  onClick: () => void;
};

export default function AddDealButton({ onClick }: AddDealButtonProps) {
  return (
    <button type="button" onClick={onClick}>
      + Add Deal
    </button>
  );
}
