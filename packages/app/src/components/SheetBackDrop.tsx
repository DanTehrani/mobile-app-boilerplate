import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';

const SheetBackDrop = (props: BottomSheetBackdropProps) => {
  return (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={-1} // Hides the backdrop when the sheet is fully closed
      opacity={0.9} // Set the backdrop opacity
    />
  );
};

export default SheetBackDrop;
