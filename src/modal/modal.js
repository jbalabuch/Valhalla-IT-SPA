import $ from "jquery";
import moment from 'moment'
import cart from "../cart/it-spa-cart";

export const modal = getSelectedRoom => {

  const modal = $(`<div class="modal fade" id="reservation" role="dialog">`)

  const modalDialog = $(`<div class="modal-dialog modal-dialog-centered modal-sm">`)
  modal.append(modalDialog)

  const modalContent = $(`<div class="modal-content text-dark">`)
  modalDialog.append(modalContent)

  const modalHeader = $(`
  <div class="modal-header">
    <h4 class="modal-title">Wybierz okres pobytu</h4>
    <button type="button" class="close" data-dismiss="modal">&times;</button>
  </div>
  `)
  modalContent.append(modalHeader)


  const modalBody = $(`<div class="modal-body">`)

  const labelStartInput = $(`<label class="mt-4">Od</label>`)
  const startDateInput = $(`<input class="form-control" type="date" id="start-date" />`);

  const labelEndInput = $(`<label class="mt-4">Do</label>`)
  const endDateInput = $(`<input class="form-control" type="date" id="end-date" />`);

  modalBody.append(labelStartInput, startDateInput, labelEndInput, endDateInput)
  modalContent.append(modalBody)


  const modalFooter = $(`<div class="modal-footer">`)
  modalContent.append(modalFooter)

  const button = $(`<button class='btn btn-lg btn-block btn-outline-primary'>Zatwierdź</button>`);
  modalFooter.append(button)


  const formAlert = $(`<div class="alert alert-danger mt-4 mb-3">`)
  formAlert.hide()

  modalBody.append(formAlert)


  button.on("click", e => {
    e.preventDefault()

    const actualDate = new Date().getTime();
    const startDate = new Date(startDateInput.val()).getTime();
    const endDate = new Date(endDateInput.val()).getTime();

    const dateFirst = new moment(startDate);
    const dateSec = new moment(endDate);
    const duration = moment.duration(dateSec.diff(dateFirst));

    console.log(startDateInput.val())
    console.log(endDateInput.val())

    if (
      startDateInput.val() == "" ||
      endDateInput.val() == ""
    ) {
      formAlert.text("Wybierz okres pobytu!")
      formAlert.show()
      return
    }


    if (
      actualDate > startDate ||
      actualDate > endDate ||
      startDate > endDate
    ) {
      formAlert.text("Wprowadź poprawny okres pobytu!")
      formAlert.show()
      return
    }


    if (duration.asYears() > 1) {
      formAlert.text("Wybrana data wyjazdu nie może być dalsza niż rok od daty przyjazdu")
      formAlert.show()
      return
    }

    formAlert.hide()

    const selectedRoom = getSelectedRoom()
    const { name, price } = selectedRoom
    const sumPrice = price * duration.asDays()

    cart.addRoom(name, startDate, endDate, price, sumPrice)

    modal.modal("hide")
  });

  return modal;
};
