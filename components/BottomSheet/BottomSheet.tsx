import React, { forwardRef, useMemo, useRef } from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

interface MyBottomSheetProps {
  children: JSX.Element;
}

export const MyBottomSheet = forwardRef<BottomSheet, MyBottomSheetProps>(
  ({ children }, ref) => {
    const snapPoints = useMemo(() => ["45%"], []);
    return (
      <BottomSheet
        ref={ref}
        snapPoints={snapPoints}
        enablePanDownToClose
        index={-1}
      >
        <BottomSheetView>{children}</BottomSheetView>
      </BottomSheet>
    );
  }
);
