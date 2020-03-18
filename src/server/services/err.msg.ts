/* eslint-disable max-len */
export enum ERROR_MESSAGE {
  LIMIT_IS_NUMBER = 'Opsi "limit" harus merupakan sebuah angka',
  LIMIT_MINIMUM_ONE = 'Jumlah kategori minimum yang diizinkan untuk diminta adalah 1 buah',
  OFFSET_NON_NEGATIVE = 'Opsi "start" harus merupakan sebuah bilangan non-negatif',
  OFFSET_IS_NUMBER = 'Opsi "start" harus merupakan sebuah bilangan',
}

export enum CATEGORY_ERROR_MESSAGE {
  NAME_IS_STRING = 'Nama kategori harus merupakan sebuah string',
  NAME_MINIMUM_LIMIT = 'Nama kategori minimal terdiri dari 3 karakter',
  NAME_MAXIMUM_LIMIT = 'Nama kategori maksimal terdiri dari 25 karakter',
  NAME_ONLY_ALPHA = 'Nama kategori hanya boleh terdiri dari alfabet dan spasi',
  NAME_IS_REQUIRED = 'Nama kategori harus ada',
  DESC_IS_STRING = 'Deskripsi kategori harus merupakan sebuah string',
  DESC_MINIMUM_LIMIT = 'Deskripsi kategori minimal terdiri dari 10 karakter',
  DESC_MAXIMUM_LIMIT = 'Deskripsi kategori maksimal terdiri dari 100 karakter',
  DESC_IS_REQUIRED = 'Deskripsi kategori harus ada',
  ID_IS_NUMBER = 'ID kategori harus merupakan sebuah angka',
  ID_IS_REQUIRED = 'ID kategori harus ada',
}

export enum ANNOUNCEMENT_ERROR_MESSAGE {
  CATEGORY_IS_NUMBER = 'Kategori harus merupakan sebuah ID berupa angka',
  TITLE_IS_STRING = 'Judul pengumuman harus merupakan sebuah string',
  TITLE_IS_REQUIRED = 'Judul pengumuman harus ada',
  TITLE_MINIMUM_LIMIT = 'Judul pengumuman minimal terdiri dari 3 karakter',
  TITLE_MAXIMUM_LIMIT = 'Judul pengumuman maksimal terdiri dari 25 karakter',
  TITLE_CHARACTER_LIMIT = 'Judul pengumuman hanya boleh terdiri dari huruf, angka, spasi, titik, koma, dan strip',
  CONTENTS_IS_STRING = 'Isi pengumuman harus merupakan sebuah string',
  CONTENTS_IS_REQUIRED = 'Isi pengumuman harus ada',
  CONTENTS_MINIMUM_LIMIT = 'Isi pengumuman minimal terdiri dari 10 karakter',
  CONTENTS_MAXIMUM_LIMIT = 'Isi pengumuman maksimal terdiri dari 250 karakter',
  VALID_IS_DATE = 'Waktu berlaku pengumuman harus merupakan tanggal',
  VALID_IS_ISO = 'Waktu berlaku pengumuman harus merupakan tanggal dengan format ISO string',
  VALID_IS_REQUIRED = 'Waktu berlaku pengumuman harus ada',
  CATEGORIES_IS_ARRAY = 'Daftar kategori pengumuman harus merupakan sebuah array',
  CATEGORIES_IS_REQUIRED = 'Daftar kategori pengumuman harus ada',
  CATEGORIES_IS_ID_ARRAY = 'Daftar kategori pengumuman harus merupakan sebuah array ID berupa angka',
  CATEGORIES_MINIMUM_LIMIT = 'Daftar kategori pengumuman minimal terdiri dari sebuah kategori',
  CATEGORIES_MAXIMUM_LIMIT = 'Daftar kategori pengumuman maksimal terdiri dari 5 kategori',
  ID_IS_REQUIRED = 'ID pengumuman harus ada',
  ID_IS_NUMBER = 'ID pengumuman harus merupakan sebuah angka',
  TITLE_ALREADY_EXIST = 'Pengumuman dengan judul yang sama sudah ada. Mohon ubah judul pengumuman anda',
  ANNOUNCEMENT_NOT_EXIST = 'Pengumuman yang anda ingin diubah tidak ada',
  CATEGORY_NOT_EXIST = 'Satu atau lebih kategori tidak ada',
  VALID_IS_LATER = 'Waktu berlaku pengumuman harus lebih tua dari hari ini',
  VALID_HAS_EXPIRED = 'Pengumuman sudah tidak berlaku lagi. Silahkan membuat pengumuman baru'
}

export enum USER_ERROR_MESSAGE {
  EMAIL_IS_STRING = 'Email harus merupakan sebuah string',
  EMAIL_IS_EMAIL = 'Email harus merupakan sebuah email yang valid',
  EMAIL_IS_REQUIRED = 'Email harus ada',
  EMAIL_ALREADY_EXIST = 'Akun dengan email yang sama sudah ada',
  EMAIL_GOOGLE_NOT_EXIST = 'Akun Google ini belum didaftarkan pada sistem',
  TOKEN_IS_STRING = 'ID token harus merupakan sebuah string',
  TOKEN_IS_TOKEN = 'ID token harus merupakan sebuah token JWT',
  TOKEN_IS_REQUIRED = 'ID token harus ada',
  TOKEN_INVALID = 'ID token anda tidak valid. Mohon perbaiki ID token anda',
  ADMINISTRATOR_IS_ROOT = 'Anda tidak dapat menghapus administrator utama',
  CREATE_ONLY_ROOT = 'Pembuatan administrator baru hanya dapat dilakukan oleh administrator utama',
  DELETE_ONLY_ROOT = 'Penghapusan administrator hanya dapat dilakukan oleh administrator utama',
  USER_ACTIVE_ONLY = 'Hanya administrator yang sudah aktif yang dapat menggunakan fitur ini',
}
