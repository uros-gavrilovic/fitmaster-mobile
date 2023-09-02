import * as React from "react";
import { Chip, DataTable, IconButton } from "react-native-paper";
import withTranslations from "../../../utils/HighOrderComponent";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as exercisesActions from "../../../actions/exercises";

const ExerciseTable = (props) => {
  const { t } = props || {};

  const [page, setPage] = React.useState(0);
  const [numberOfItemsPerPageList] = React.useState([10, 20, 30]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  );

  const { exercises } = useSelector((state) => state.exercises);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(exercisesActions.fetchExercises());
  }, [dispatch]);

  const [items, setItems] = useState(exercises);
  useEffect(() => {
    setItems(exercises);
  }, [exercises]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>{t?.table?.name}</DataTable.Title>
        <DataTable.Title>{t?.table?.category}</DataTable.Title>
        <DataTable.Title>{t?.table?.body_part}</DataTable.Title>
        <DataTable.Title>{t?.table?.select}</DataTable.Title>
      </DataTable.Header>

      {items.slice(from, to).map((item) => (
        <DataTable.Row key={item.key}>
          <DataTable.Cell>{item.name}</DataTable.Cell>
          <DataTable.Cell>
            <Chip>{item.category}</Chip>
          </DataTable.Cell>
          <DataTable.Cell>
            <Chip>{item.bodyPart}</Chip>
          </DataTable.Cell>
          <DataTable.Cell>
            <IconButton
              icon="plus"
              size={20}
              mode="contained"
              onPress={() => console.log("Pressed on", JSON.stringify(item))}
            />
          </DataTable.Cell>
        </DataTable.Row>
      ))}

      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(items.length / itemsPerPage)}
        onPageChange={(page) => setPage(page)}
        label={`${from + 1}-${to} ${t?.fields?.of} ${items.length}`}
        numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfItemsPerPage={itemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
        showFastPaginationControls
        selectPageDropdownLabel={t?.fields?.rows_per_page}
      />
    </DataTable>
  );
};

export default withTranslations(ExerciseTable);
