class UsersController < ApplicationController

  def edit
    # users/edit.html.hamlへ
    # 編集画面に飛ぶだけ　インスタンス変数は不要　
    # なぜならヴューにインスタンス変数が必要なデザインではないから
  end

  def update
    # 更新　dbへ
    if current_user.update(user_params)
      # params.require(:user).permit(:name, :email)
      redirect_to root_path
      # トップへ戻る
    else
      render :edit
      # editアクションへ
    end
  end

  private
  
  def user_params
    params.require(:user).permit(:name, :email)
    # ログイン中ユーザー情報を含んだuserモデルインスタンスより取得

  end
end
