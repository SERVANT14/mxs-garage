import toastr from 'toastr'

export class Toaster {
  static success (message) {
    toastr.success(message)
  }

  static error (message) {
    toastr.error(message)
  }
}
