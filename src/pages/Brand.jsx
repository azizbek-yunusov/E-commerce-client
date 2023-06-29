import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const Brand = () => {
  const { slug } = useParams();
  let { t } = useTranslation(["home"]);
  const { brand } = useSelector(
    (state) => state.brand
  );
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  useEffect(() => {
    // dispatch(getBrad({ slug }));
  }, [dispatch, slug]);
  return (
    <div>Brand</div>
  )
}

export default Brand