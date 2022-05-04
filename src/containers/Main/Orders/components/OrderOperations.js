import { safeAwait } from 'helpers/safeAwait';
import {
  HStack,
  Text,
  VStack,
  Image,
  Pressable,
  Modal,
  useDisclose,
  Button,
  Badge,
} from 'native-base';
import React, { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import {
  buyInsuranceToOrderService,
  orderIsNotMineService,
} from 'services/Orders';
import { fetchSingleOrder } from 'store/Orders/Single';
import { useTheme } from 'theme';
import OrderReturnToSellerSheet from './OrderReturnToSellerSheet';

const ActionButton = ({ title, image, onPress }) => (
  <Pressable onPress={onPress}>
    <Image
      resizeMode="contain"
      source={image}
      alt="actions"
      size={6}
      alignSelf="center"
    />
    <Text width="57px" textAlign="center" fontSize="xs" mt={2}>
      {title}
    </Text>
  </Pressable>
);

const OrderSimpleModal = ({
  isOpen,
  onClose,
  headerTitle,
  contentText,
  confirmText,
  cancelText,
  onConfirm,
  isLoading,
}) => (
  <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
    <Modal.Content
      borderRadius={10}
      backgroundColor="white"
      maxWidth="400px"
      p={5}>
      <Modal.Header>{headerTitle}</Modal.Header>
      <Modal.Body padding={0} mb={8}>
        <Text>{contentText}</Text>
      </Modal.Body>
      <Button.Group>
        <Button
          size="md"
          flex={1}
          variant="outline"
          colorScheme="blueGray"
          onPress={onClose}>
          {cancelText}
        </Button>
        <Button isLoading={isLoading} size="md" flex={1} onPress={onConfirm}>
          {confirmText}
        </Button>
      </Button.Group>
    </Modal.Content>
  </Modal>
);

const OrderOperations = ({ order }) => {
  const { t } = useTranslation();
  const { Images } = useTheme();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const { id, is_missing, ins, image_request } = order;

  const {
    isOpen: isOpenInsurance,
    onOpen: onOpenInsurance,
    onClose: onCloseInsurance,
  } = useDisclose();

  const {
    isOpen: isOpenIsNotMine,
    onOpen: onOpenIsNotMine,
    onClose: onCloseIsNotMine,
  } = useDisclose();

  const {
    isOpen: isOpenReturnOrderToSeller,
    onOpen: onOpenReturnOrderToSeller,
    onClose: onCloseReturnOrderToSeller,
  } = useDisclose();

  const onConfirmBuyInsurance = useCallback(async () => {
    setIsLoading(true);
    const [error, data] = await safeAwait(
      buyInsuranceToOrderService(id),
      () => {
        onCloseInsurance();
        setIsLoading(false);
      }
    );
    const { status, message } = data;
    if (status) {
      dispatch(fetchSingleOrder({ id }));
    }
  }, []);

  const onConfirmIsNotMine = async () => {
    setIsLoading(true);
    const [error, data] = await safeAwait(orderIsNotMineService(id), () => {
      onCloseIsNotMine();
      setIsLoading(false);
    });
    const { status, message } = data;
    if (status) {
      dispatch(fetchSingleOrder({ id }));
    }
  };

  const hasInsurance = ins !== 0;
  const hasImageRequest = image_request !== null;
  const hasOrderIsNotMineRequest = is_missing;

  return (
    <>
      {useMemo(
        () => (
          <VStack my={3}>
            {hasOrderIsNotMineRequest && (
              <Badge borderRadius={5} padding={2} variant="outline">
                Bağlamanın sizə aid olmadığının araşdırılması üçün sorğu
                yaradılıb.
              </Badge>
            )}
          </VStack>
        ),
        []
      )}
      {useMemo(
        () => (
          <HStack my={4} justifyContent="space-evenly">
            {!hasInsurance && (
              <ActionButton
                title={t('orderDetail.buyInsurance')}
                image={Images.insurance}
                onPress={onOpenInsurance}
              />
            )}
            {!hasOrderIsNotMineRequest && (
              <ActionButton
                title={t('orderDetail.orderIsNotMine')}
                image={Images.isntme}
                onPress={onOpenIsNotMine}
              />
            )}
            {!hasImageRequest && (
              <ActionButton
                title={t('orderDetail.orderReturnToSeller')}
                image={Images.return}
                onPress={onOpenReturnOrderToSeller}
              />
            )}
            <ActionButton
              title={t('orderDetail.orderRequestImagePackage')}
              image={Images.image}
            />
          </HStack>
        ),
        [hasInsurance, hasOrderIsNotMineRequest, hasImageRequest]
      )}
      {/* Modals */}
      {useMemo(
        () => (
          <OrderSimpleModal
            isLoading={isLoading}
            isOpen={isOpenInsurance}
            onClose={onCloseInsurance}
            onOpen={onOpenInsurance}
            onConfirm={onConfirmBuyInsurance}
            headerTitle={t('orderDetail.buyInsurance')}
            contentText={t('orderDetail.buyInsuranceContent')}
            confirmText={t('orderDetail.buyWithAmount', {
              amount: 1.7,
              currency: 'AZN',
            })}
            cancelText={t('common.cancel')}
          />
        ),
        [isOpenInsurance, onOpenInsurance, onCloseInsurance]
      )}
      {useMemo(
        () => (
          <OrderSimpleModal
            isLoading={isLoading}
            isOpen={isOpenIsNotMine}
            onClose={onCloseIsNotMine}
            onOpen={onOpenIsNotMine}
            onConfirm={onConfirmIsNotMine}
            headerTitle={t('orderDetail.orderIsNotMine')}
            contentText={t('orderDetail.orderIsNotMineContent')}
            confirmText={t('common.confirm')}
            cancelText={t('common.cancel')}
          />
        ),
        [isOpenInsurance, onOpenInsurance, onCloseInsurance]
      )}
      {useMemo(() => (
        <OrderReturnToSellerSheet
          order={order}
          isOpen={isOpenReturnOrderToSeller}
          onClose={onCloseReturnOrderToSeller}
        />
      ))}
      {/* Modals */}
    </>
  );
};

export default OrderOperations;
