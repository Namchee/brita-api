/* eslint-disable max-len */
export enum ERROR_MESSAGE {
  LIMIT_IS_NUMBER = '"limit" harus merupakan sebuah angka',
  LIMIT_MINIMUM_ONE = 'Jumlah kategori minimum yang diizinkan untuk diminta adalah 1 buah',
  OFFSET_NON_NEGATIVE = '"offset" harus merupakan sebuah bilangan non-negatif',
  OFFSET_IS_NUMBER = '"offset" harus merupakan sebuah bilangan',
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